import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createListing, getListings } from '../apis/listing';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CurrencyConvertor from '../components/CurrencyConvertor';
import CustomLoader from '../components/CustomLoader';
import { getCurrencyExchangeRate } from '../apis/exchange-rate';
import { p2pContract } from '../utils/contract';
import { ethers } from 'ethers';
const SellPage = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [imagePreviews, setImagePreviews] = useState([]);
	const [listings, setListings] = useState([]);
	const [price, setPrice] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [exchangeRate, setExchangeRate] = useState(0);

	const navigate = useNavigate();
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		const previews = files.map((file) => URL.createObjectURL(file));
		setImagePreviews(previews);

		// Convert images to Base64 format
		Promise.all(
			files.map((file) => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onloadend = () => resolve(reader.result);
					reader.onerror = reject;
				});
			})
		).then((base64Images) => {
			setListings((prev) => ({
				...prev,
				images: base64Images,
			}));
		});
	};

	const fetchExRate = async () => {
		try {
			const res = await getCurrencyExchangeRate('USD');
			setExchangeRate(parseFloat(res.data.rates['ETH']));
		} catch (error) {
			console.error('Error fetching exchange rate:', error);
		}
	};

	const handleListProducesOnChain = async (data) => {
		await fetchExRate();
		// USD to Wei conversion
		const pricePerQuintal = ethers.utils.parseUnits(
			data._pricePerQuintal.toString(),
			6
		);
		const exchangeRateBig = ethers.utils.parseUnits(
			exchangeRate.toString(),
			18
		);
		const totalPriceInWei = pricePerQuintal
			.mul(exchangeRateBig)
			.div(ethers.BigNumber.from(10).pow(6));

		console.log('Total price in wei:', totalPriceInWei.toString());
		const tx = await p2pContract.listItem(
			data._title,
			totalPriceInWei, // in wei,
			data._totalStock,
			data._listingId,
			data._maxDeliveryTime
		);
		await tx.wait();
	};

	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);
			const res = await getListings();
			const listingId = res.length + 1;

			if (p2pContract) {
				await handleListProducesOnChain({
					_title: data.title,
					_pricePerQuintal: parseInt(data.pricePerUnit),
					_totalStock: parseInt(data.quantity),
					_listingId: listingId,
					_maxDeliveryTime: parseInt(data.maxDeliveryTime || 30),
				});
			} else {
				toast.error(
					'Unable to connect to the contract, please try again later'
				);
				return;
			}
			const payload = {
				title: data.title,
				desc: data.description,
				price: data.pricePerUnit,
				total_stock: data.quantity,
				location: data.city,
				images: listings.images,
				listingId,
			};

			await createListing(payload);
			reset();
			setImagePreviews([]);
			toast.success('Listing created successfully');
			navigate('/');
		} catch (error) {
			console.error('Error creating listing:', error);
			toast.error('Error creating listing');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='flex max-md:flex-row h-screen items-center p-5'>
			<div className='w-1/2 max-md:w-full md:sticky mt-[80px] bg-[#283e2f] text-[#bcdef0] self-start border-2 rounded-3xl px-2'>
				<h2 className='text-2xl font-medium mt-3 p-2 text-center md:text-left'>
					List your produce 🌾
				</h2>
				<hr />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-4 overflow-scroll h-[70vh] p-2'
				>
					<div className='flex gap-5 w-full'>
						<div className='w-[35%] '>
							<label htmlFor='title' className='block text-sm font-medium'>
								Title
							</label>
							<input
								type='text'
								{...register('title', { required: 'Title is required' })}
								placeholder='Enter Title'
								id='title'
								className='mt-1 flex w-[100%] px-3 h-[60%] bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
							/>
							{errors.title && (
								<p className='text-red-500 text-xs'>{errors.title.message}</p>
							)}
						</div>

						<div className='w-[55%]'>
							<label
								htmlFor='description'
								className='block text-sm font-medium'
							>
								Description
							</label>
							<textarea
								{...register('description', {
									required: 'Description is required',
								})}
								id='description'
								placeholder='Enter the description in detail ...'
								className='mt-1 flex w-[100%] bg-white px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
							{errors.description && (
								<p className='text-red-500 text-xs'>
									{errors.description.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label htmlFor='image' className='block text-sm mb-1 font-medium'>
							Images
						</label>
						<input
							type='file'
							id='image'
							{...register('images')}
							multiple
							onChange={handleImageChange}
							className='file-input file-input-bordered image-full bg-white text-black w-full file-input-info'
						/>
						<div className='mt-3 grid grid-cols-3 gap-4'>
							{imagePreviews.map((preview, index) => (
								<img
									key={index}
									src={preview}
									alt={`Preview ${index}`}
									className='h-32 w-full object-cover rounded-md'
								/>
							))}
						</div>
					</div>

					<div className='flex gap-5'>
						<div>
							<label htmlFor='quantity' className='block text-sm font-medium'>
								Quantity (in quintals)
							</label>
							<input
								type='number'
								{...register('quantity', {
									required: 'Quantity is required',
									min: {
										value: 0.5,
										message: 'Minimum quantity is 0.5 quintals',
									},
								})}
								id='quantity'
								className='mt-1 block w-full px-3 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
							{errors.quantity && (
								<p className='text-red-500 text-xs'>
									{errors.quantity.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor='pricePerUnit'
								className='block text-sm font-medium'
							>
								Price per quintal (in USD)
							</label>
							<input
								type='number'
								{...register('pricePerUnit', {
									required: 'Price per unit is required',
									min: {
										value: 1,
										message: 'Price must be greater than 0',
									},
									onChange: (e) => setPrice(e.target.value),
								})}
								id='pricePerUnit'
								className='mt-1 block w-full px-3 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
							{errors.pricePerUnit && (
								<p className='text-red-500 text-xs'>
									{errors.pricePerUnit.message}
								</p>
							)}
							<CurrencyConvertor from={'USD'} to={'ETH'} value={price} />
						</div>
						<div>
							<label
								htmlFor='maxDeliveryTime'
								className='block text-sm font-medium'
							>
								Maximum Delivery Time (in days)
							</label>
							<input
								type='number'
								defaultValue={30}
								{...register('maxDeliveryTime', {
									required: 'Maximum delivery time unit is required',
									min: {
										value: 7,
										message:
											'Maximum delivery must time be greater than 7 days',
									},
									max: {
										value: 30,
										message:
											'Maximum delivery must time be less than or equal to 30 days',
									},
								})}
								id='maxDeliveryTime'
								className='mt-1 block w-full px-3 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
							{errors.maxDeliveryTime && (
								<p className='text-red-500 text-xs'>
									{errors.maxDeliveryTime.message}
								</p>
							)}
							<p className='text-sm text-green-400'>
								We recommend to keep it 30 days.
							</p>
						</div>
					</div>

					<div>
						<label htmlFor='city' className='block text-sm font-medium'>
							Location
						</label>
						<input
							type='text'
							{...register('city', { required: 'Location is required' })}
							placeholder='Enter location'
							className='mt-1 block w-full px-3 mb-4 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						/>
						{errors.city && (
							<p className='text-red-500 text-xs'>{errors.city.message}</p>
						)}
					</div>
					<button
						type='submit'
						disabled={isSubmitting}
						className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400'
					>
						{isSubmitting ? <CustomLoader size={20} /> : 'Add Item'}
					</button>
				</form>
			</div>
			<div className='hidden md:block'>
				<img src='https://cdni.iconscout.com/illustration/premium/thumb/woman-selling-agricultural-products-illustration-download-in-svg-png-gif-file-formats--farmer-store-sell-pack-agriculture-illustrations-6020566.png' />
			</div>
		</div>
	);
};

export default SellPage;
