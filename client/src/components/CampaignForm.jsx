import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { startFundraiser } from '../apis/fundRaiser';
import { cwfContract } from '../utils/contract';
import CustomLoader from './CustomLoader';

const CampaignForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [imagePreviews, setImagePreviews] = useState([]);
	const [fundraisers, setFundraisers] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	// Handle image input and generate previews
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
			setFundraisers((prev) => ({
				...prev,
				images: base64Images,
			}));
		});
	};

	const handleCreateFundraiserOnChain = async (data) => {
		await cwfContract.getProject(123);
		const tx = await cwfContract.createProject(
			data._name,
			data._targetFunds,
			data._deadline,
			1331
		);
		await tx.wait();
	};

	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);
			if (cwfContract) {
				await handleCreateFundraiserOnChain({
					_name: data.title,
					_targetFunds: data.targetAmount,
					_deadline: new Date(data.deadline).getTime(),
				});
			}
			const payload = {
				title: data.title,
				desc: data.description,
				target_funds: data.targetAmount,
				deadline: data.deadline,
				images: fundraisers.images,
			};
			await startFundraiser(payload);
			reset();
			setImagePreviews([]);
			toast.success('Funds Raised successfully');
			navigate('/donate');
		} catch (error) {
			console.error('Error creating fundraiser:', error);
			toast.error('Error creating fundraiser');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='flex max-md:flex-row h-screen items-center justify-evenly p-5'>
			<div className='w-1/2 max-md:w-full md:sticky mt-[80px] bg-[#283e2f] text-[#e0fce7] self-start border-2 rounded-3xl px-2'>
				<h2
					className='text-2xl font-medium mt-3 p-2 text-center md:text-left'
					onClick={handleCreateFundraiserOnChain}
				>
					<div className='flex items-center justify-center gap-2'>
						Start a Fundraiser{' '}
						<svg
							stroke='currentColor'
							fill='currentColor'
							viewBox='0 0 1024 1024'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm22.3 665.2l.2 31.7c0 4.4-3.6 8.1-8 8.1h-28.4c-4.4 0-8-3.6-8-8v-31.4C401.3 723 359.5 672.4 355 617.4c-.4-4.7 3.3-8.7 8-8.7h46.2c3.9 0 7.3 2.8 7.9 6.6 5.1 31.7 29.8 55.4 74.1 61.3V533.9l-24.7-6.3c-52.3-12.5-102.1-45.1-102.1-112.7 0-72.9 55.4-112.1 126.2-119v-33c0-4.4 3.6-8 8-8h28.1c4.4 0 8 3.6 8 8v32.7c68.5 6.9 119.9 46.9 125.9 109.2.5 4.7-3.2 8.8-8 8.8h-44.9c-4 0-7.4-3-7.9-6.9-4-29.2-27.4-53-65.5-58.2v134.3l25.4 5.9c64.8 16 108.9 47 108.9 116.4 0 75.3-56 117.3-134.3 124.1zM426.6 410.3c0 25.4 15.7 45.1 49.5 57.3 4.7 1.9 9.4 3.4 15 5v-124c-36.9 4.7-64.5 25.4-64.5 61.7zm116.5 135.2c-2.8-.6-5.6-1.3-8.8-2.2V677c42.6-3.8 72-27.2 72-66.4 0-30.7-15.9-50.7-63.2-65.1z'></path>
						</svg>
					</div>
				</h2>
				<hr />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-4 overflow-scroll h-[70vh] p-2'
				>
					<div className='w-full'>
						<label htmlFor='title' className='block text-sm font-medium'>
							Title
						</label>
						<input
							type='text'
							{...register('title', { required: 'Title is required' })}
							placeholder='Give a nice title'
							id='title'
							className='mt-1 flex w-[100%] px-3 h-[60%] bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
						/>
						{errors.title && (
							<p className='text-red-500 text-xs'>{errors.title.message}</p>
						)}
					</div>

					<div className='w-full'>
						<label htmlFor='description' className='block text-sm font-medium'>
							Description
						</label>
						<textarea
							{...register('description', {
								required: 'Description is required',
							})}
							id='description'
							rows={5}
							placeholder='Describe about your fundraiser in detail...'
							className='mt-1 flex w-[100%] bg-white px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						/>
						{errors.description && (
							<p className='text-red-500 text-xs'>
								{errors.description.message}
							</p>
						)}
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
						<div className='w-full'>
							<label htmlFor='deadline' className='block text-sm font-medium'>
								Deadline
							</label>
							<input
								type='date'
								name='deadline'
								id='deadline'
								{...register('deadline', { required: 'Deadline is required' })}
								className='mt-1 w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								onClick={(e) => e.target.showPicker()}
							/>
							{errors.deadline && (
								<p className='text-red-500 text-xs'>
									{errors.deadline.message}
								</p>
							)}
						</div>

						<div className='w-full'>
							<label
								htmlFor='targetAmount'
								className='block text-sm font-medium'
							>
								Target Amount (in USD)
							</label>
							<input
								type='number'
								name='targetAmount'
								id='targetAmount'
								placeholder='Set a target amount'
								{...register('targetAmount', {
									required: 'Target Amount is required',
								})}
								className='mt-1 w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
							{errors.targetAmount && (
								<p className='text-red-500 text-xs'>
									{errors.targetAmount.message}
								</p>
							)}
						</div>
					</div>
					<button
						type='submit'
						disabled={isSubmitting}
						className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400'
					>
						{isSubmitting ? <CustomLoader size={24} /> : 'Create Fundraiser'}
					</button>
				</form>
			</div>
			<div className='hidden md:block'>
				<img
					className='rounded-full border-2'
					src='https://png.pngtree.com/png-clipart/20230120/ourmid/pngtree-financial-crowdfunding-banknotes-png-image_6178078.png'
				/>
			</div>
		</div>
	);
};

export default CampaignForm;
