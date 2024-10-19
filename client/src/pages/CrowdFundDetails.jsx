import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import ProgressBar from '../components/ProgressBar';
import { useNavigate, useParams } from 'react-router-dom';
import CustomLoader from '../components/CustomLoader';
import { donateToFundraiser, getFundraiser } from '../apis/fundRaiser';
import { formatDistanceStrict, isPast, set } from 'date-fns';
import toast from 'react-hot-toast';
import { cwfContract } from '../utils/contract';
import { ethers } from 'ethers';
import { getCurrencyExchangeRate } from '../apis/exchange-rate';

const CrowdFundDetails = () => {
	const { id } = useParams();
	const [fundraiser, setFundraiser] = useState([]);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(0);
	const [error, setError] = useState('');
	const [exchangeRate, setExchangeRate] = useState(0);
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);

	const formatDate = (date) => {
		const options = { year: 'numeric', month: 'short', day: 'numeric' };
		return new Date(date).toLocaleDateString(undefined, options);
	};
	const handleQuantityChange = (e) => {
		const qty = parseInt(e.target.value, 10);
		if (qty === 0) {
			setError('Donation amount cannot be 0');
			setQuantity(qty);
		} else {
			setError('');
			setQuantity(qty);
		}
	};
	const fetchExRate = async () => {
		try {
			const res = await getCurrencyExchangeRate('USD');
			setExchangeRate(parseFloat(res.data.rates['ETH']));
		} catch (error) {
			console.error('Error fetching exchange rate:', error);
		}
	};

	const getFundraiserDetail = async () => {
		try {
			const response = await getFundraiser(id);
			console.log('response', response);
			console.log('response', response.donators?.length);
			setFundraiser(response);
		} catch (error) {
			console.error('Error fetching fundraiser:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getFundraiserDetail();
	}, []);

	const donate = async () => {
		setIsProcessing(true);
		if (quantity === 0) {
			setError('Donation amount cannot be 0');
			return;
		}
		const donationData = {
			fundraiser_id: id,
			amount: quantity,
		};
		await fetchExRate();
		const amountInEther = parseFloat(quantity) * parseFloat(exchangeRate);
		try {
			await cwfContract.fund(fundraiser.projectId, {
				value: ethers.utils.parseEther(amountInEther.toString()),
			});
			await donateToFundraiser(donationData);
			toast.success('Donation successful');
			navigate('/dashboard');
		} catch (error) {
			console.error('Error donating to fundraiser:', error);
			toast.error('Donation failed');
		} finally {
			setIsProcessing(false);
		}
	};

	if (loading) {
		return (
			<div className='absolute inset-0 flex items-center justify-center text-black'>
				<div className='flex items-center gap-4'>
					<CustomLoader /> Fetching Campaign Details...
				</div>
			</div>
		);
	}

	const deadlineDate = new Date(fundraiser.deadline);
	const daysLeft = formatDistanceStrict(deadlineDate, new Date());
	const deadlineExpired = isPast(deadlineDate);
	const deadlineMessage = deadlineExpired ? 'Expired' : `${daysLeft} left`;

	return (
		<div className=' flex flex-row items-start h-[110vh] overflow-y-auto'>
			<div className='flex flex-col p-3 bg-red-00  pt-12 w-1/2 '>
				<div className=' h-[310px] w-[430px]  m-12 '>
					<Carousel images={fundraiser.images} />
				</div>
				<h2 className='text-2xl bg-red-3 flex items-center justify-between pl-2 text-[#283e2f] '>
					<div>{fundraiser.title}</div>
					{/* <h5 className="text-base mr-4">~by {product.owner}</h5> */}
				</h2>
				<h2 className='bg-cyan-00 p-2 overflow-scroll'>{fundraiser.desc}</h2>
			</div>

			<div className=' flex flex-col p-3 bg-red-00  h-[99vh] pt-14 w-1/2'>
				<h2 className='text-2xl font-semibold  mt-12 text-[#283e2f] '>
					For Helping, {fundraiser.owner.name}
				</h2>
				<h2 className='text-6xl font-semibold mt-8 text-green-600 '>
					$ {fundraiser.amt_collected}
				</h2>
				<h2 className='text-sm font-normal pt-2  text-[#283e2f] '>
					<span className='text-lg'>raised of </span>
					<span className='text-black font-bold text-xl'>
						{' '}
						$ {fundraiser.target_funds}
					</span>
				</h2>
				<ProgressBar
					currentAmount={fundraiser.amt_collected}
					targetAmount={fundraiser.target_funds}
				/>

				<div className='flex mt-2 justify-between items-center'>
					<div className='flex items-center'>
						<h2 className='text-xl font-semibold text-[#283e2f] '>
							{deadlineMessage}
						</h2>
						{/* <h2 className="text-lg pl-4   text-[#283e2f] ">Days left</h2> */}
					</div>
					<div className='flex items-center'>
						<h2 className='text-xl font-semibold pl-2  text-[#283e2f] '>
							{fundraiser.donatorsCount}
						</h2>
						<h2 className='text-lg pl-4   text-[#283e2f] '>supporters</h2>
					</div>
				</div>

				<div className='flex mt-6 flex-col'>
					<h2 className='text-xl font-semibold  text-[#283e2f] '>
						Contribution Amount:
					</h2>
					<h2 className='text-sm font-semibold  text-[#283e2f] mb-2'>
						(in USD)
					</h2>
					<input
						type='number'
						id='quantity'
						value={quantity}
						onChange={handleQuantityChange}
						placeholder='Enter amount in $'
						className='bg-transparent text-xl border-gray-600 focus:border-gray-900 border-2 rounded-lg p-2 text-[#283e2f] '
					></input>
					{error && <h2 className='text-red-500 pl-4 m-2'>{error}</h2>}
				</div>

				<button
					onClick={donate}
					className={`btn mt-6 text-[#e0fce7] bg-green-700 ${
						error ? 'disabled cursor-not-allowed opacity-50' : ''
					}`}
				>
					{isProcessing ? <CustomLoader size={20} /> : 'Contribute Now'}
				</button>

				<div className='flex flex-col mt-8 bg-[#e8f5e9] rounded-lg p-4 mb-8'>
					<h2 className='text-xl font-semibold text-[#283e2f] mb-4'>
						Supporters
					</h2>
					<div className='overflow-y-auto h-48'>
						{fundraiser.donators && fundraiser.donators.length > 0 ? (
							<table className='table-auto w-full text-left text-[#283e2f] rounded-md'>
								<thead>
									<tr className='bg-[#74d677]'>
										<th className='px-4 py-2'>No.</th>
										<th className='px-4 py-2'>Name</th>
										<th className='px-4 py-2'>Amount (USD)</th>
										<th className='px-4 py-2'>Date</th>
									</tr>
								</thead>
								<tbody>
									{fundraiser.donators?.map((donator, index) => (
										<tr key={index} className='bg-[#c8e6c9]'>
											<td className='border px-4 py-2'>{index + 1}</td>
											<td className='border px-4 py-2'>{donator.user.name}</td>
											<td className='border px-4 py-2'>
												${donator.amount_donated}
											</td>
											<td className='border px-4 py-2'>
												{formatDate(donator.donated_at)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className='bg-[#158319] my-2 rounded-md'>
								<p className='border px-4 py-2 text-white font-semibold text-center'>
									No supporters yet
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CrowdFundDetails;
