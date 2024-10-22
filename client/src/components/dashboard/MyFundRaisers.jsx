import { formatDistanceStrict, isPast } from 'date-fns';
import { cwfContract } from '../../utils/contract';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FundRaisers({
	src,
	id,
	title,
	funded,
	price,
	donators_cnt,
	deadline,
	donatorsList,
	amt_collected,
	projectId,
}) {
	const deadlineDate = new Date(deadline);
	const daysLeft = formatDistanceStrict(deadlineDate, new Date());
	const deadlineExpired = isPast(deadlineDate);
	const deadlineMessage = deadlineExpired
		? 'Deadline has passed'
		: `${daysLeft} left`;

	const handleWithdrawFunds = async () => {
		try {
			toast.promise(cwfContract.withdrawOwner(projectId), {
				loading: 'Withdrawing funds...',
				success: 'Funds transferred to your wallet',
				error: 'Failed to withdraw funds',
			});
		} catch (error) {
			toast.error('Failed to withdraw funds');
			console.error('Error withdrawing owner funds ', error);
		}
	};

	const [isFundsWithdrawn, setIsFundsWithdrawn] = useState(false);

	const getFundraiserFromContract = async () => {
		try {
			const fundraiser = await cwfContract.getProject(projectId);
			setIsFundsWithdrawn(fundraiser.fundsWithdrawn);
		} catch (error) {
			console.error('Error getting fundraiser from contract ', error);
		}
	};

	useEffect(() => {
		getFundraiserFromContract();
	}, []);

	return (
		<div className='flex max-md:flex-col flex-row justify-between items-center md:items-start bg-white text-black p-6 rounded-lg shadow-lg'>
			<div className='max-md:w-full w-1/4 mb-4 md:mb-0 h-48 md:h-48 flex-shrink-0'>
				<div className='w-full h-full overflow-hidden rounded-lg'>
					<img className='w-full h-full object-cover' src={src} alt='' />
				</div>
			</div>

			<div className='max-md:w-full w-1/3 mb-4 md:mb-0 text-left flex_fix max-md:justify-between justify-evenly md:h-48'>
				<div>
					<h2 className='text-2xl font-semibold mb-2'>{title}</h2>
					<h3 className='text-gray-500 text-md  font-semibold'>
						{deadlineMessage}
					</h3>
				</div>
				<h3 className='bg-black text-white text-lg w-fit h-fit px-4 py-2 rounded-lg font-semibold'>
					{donators_cnt} donators
				</h3>
				<dialog id={`my_modal_${id}`} className='modal'>
					<div className='modal-box bg-white'>
						<h3 className='font-bold text-xl'>Supporters of this fundraiser</h3>
						<div className='py-4'>
							{donators_cnt > 0 ? (
								<table className='table-auto w-full max-h-80 overflow-y-auto text-left text-[#283e2f] rounded-xl'>
									<thead>
										<tr className='bg-[#74d677]'>
											<th className='p-2'>No.</th>
											<th className='p-2'>Name</th>
											<th className='p-2'>Amount (USD)</th>
											<th className='p-2'>Date</th>
										</tr>
									</thead>
									<tbody>
										{donatorsList?.map((donator, index) => (
											<tr key={index} className='bg-[#c8e6c9]'>
												<td className='border p-1'>{index + 1}</td>
												<td className='border p-1'>{donator.user.name}</td>
												<td className='border p-1'>
													${donator.amount_donated}
												</td>
												<td className='border p-1'>
													{new Date(donator.donated_at).toDateString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<div className='text-center mx-auto'>
									<p className='border px-4 py-2 text-white bg-green-500 font-semibold text-center'>
										No supporters yet
									</p>
								</div>
							)}
						</div>
						<p>Total amount collected : ${amt_collected}</p>
						<div className='modal-action'>
							<form method='dialog' className='flex gap-4'>
								<button
									className='btn btn-success text-white'
									onClick={handleWithdrawFunds}
								>
									Withdraw funds
								</button>
								<button
									className='btn bg-red-500 text-white hover:bg-red-600'
									onClick={() =>
										document.getElementById(`my_modal_${id}`).close()
									}
								>
									Cancel
								</button>
							</form>
						</div>
					</div>
				</dialog>
				{projectId && !isFundsWithdrawn ? (
					<button
						onClick={() =>
							document.getElementById(`my_modal_${id}`).showModal()
						}
						className='btn w-fit bg-red-500 text-white border-red-500 hover:border-red-700 hover:bg-red-700'
					>
						Withdraw funds
					</button>
				) : null}
			</div>

			<div className='max-md:w-full w-1/4 text-center md:text-right flex_fix max-md:justify-between justify-evenly md:h-48 items-center'>
				<h3 className=' bg-green-400 w-fit h-fit px-4 py-2 rounded-lg text-xl mb-6 font-semibold'>
					$ {amt_collected} collected
				</h3>

				<div className='flex justify-center items-center gap-2'>
					<div
						className='radial-progress text-[#268431] w-[70px] h-[70px] font-bold'
						style={{
							'--value': `${Math.floor(funded)}`,
							'--size': '70px',
							'--thickness': '7px',
						}}
						role='progressbar'
					>
						{funded.toFixed(0)} %
					</div>
					<p className='font-semibold'>funded</p>
				</div>
				<Link to={`/campaign/${id}`}>
					<button className='btn text-white'>View Details</button>
				</Link>
			</div>
		</div>
	);
}

export default FundRaisers;
