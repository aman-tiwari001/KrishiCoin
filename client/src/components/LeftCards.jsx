import { MdDashboard, MdWallet } from 'react-icons/md';
import { Link } from 'react-router-dom';

const openCBOnrampPopup = () => {
	const url = `https://pay.coinbase.com/buy/select-asset?appId=${
		import.meta.env.VITE_COINBASE_PROJECT_ID
	}&addresses={"${localStorage.getItem('base-wallet-address')}":["ethereum"]}`;
	window.open(url, 'popup', 'width=500,height=570');
};

function LeftCards() {
	return (
		<div className='w-full md:w-[40%] h-[50vh] flex flex-col-reverse gap-2 py-4'>
			{/* Top Card */}
			<div className=' w-full h-1/2 bg-white rounded-2xl cards-bg shadow-lg cursor-pointer'>
				<Link to='/dashboard' className='w-full h-full'>
					<div className='w-[100%] h-[100%] bg-gradient-to-b from-[#283618] to-black opacity-[0.8] rounded-2xl flex flex-col items-start px-20 justify-center '>
						<h1 className='text-4xl text-[#e0fce7] font-semibold flex gap-4 items-center'>
							<MdDashboard />
							Your Dashboard
						</h1>
						<br />
						<p className='text-md'>
							Manage your investments, orders, purchases, donations, etc
						</p>
					</div>
				</Link>
			</div>

			{/* 2 small cards */}
			<div className='flex w-full h-1/2 gap-2'>
				<>
					<Link
						to='/donate'
						className='w-1/2 h-full bg-[#283618] rounded-2xl px-10 max-md:px-4 py-6 flex flex-col items-start justify-center shadow-lg'
					>
						<h2 className='text-[#e0fce7] text-[20px] md:text-xl font-semibold flex items-center gap-1 mb-4'>
							Make a Donation
							<svg
								stroke='currentColor'
								fill='currentColor'
								viewBox='0 0 24 24'
								height='1.2em'
								width='1.1em'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M4 21h9.62c1.169 0 2.276-.509 3.037-1.397l5.102-5.952c.217-.253.294-.597.205-.918s-.332-.576-.647-.682l-1.968-.656c-.95-.317-2.042-.122-2.823.503l-3.185 2.547-.617-1.235C12.042 11.847 10.671 11 9.146 11H4c-1.103 0-2 .897-2 2v6C2 20.103 2.897 21 4 21zM4 13h5.146c.763 0 1.448.423 1.789 1.105L11.382 15H10 8 7v2h1 2 3c.001 0 .002 0 .002 0 .001 0 .001 0 .001 0 .001 0 .001 0 .002 0 0 0 .002 0 .006 0 .001 0 .002 0 .002 0 .001 0 .001 0 .001 0 .156-.002.308-.041.442-.11.001 0 .002 0 .003-.001.001-.001.003-.001.004-.002 0 0 .001 0 .001 0l.001 0c.001 0 .001 0 .001 0 .001 0 .001 0 .002-.001 0 0 .001 0 .001 0l.001 0c.001 0 .001 0 .001 0 .001 0 .001 0 .001 0 .001 0 .001 0 .001-.001.011.003.003-.001.003-.001.012 0 .002-.001.002-.001.001 0 .001 0 .001 0 .002 0 .002 0 .002-.001.001 0 .002-.001.003-.001s.001 0 .002-.001c.002 0 .001-.001.002-.001v0c.001 0 .002-.001.003-.001s.001 0 .002-.001c0 0 .001-.001.002-.001.001 0 .002-.001.003-.002s.001 0 .002-.001c.003-.001.001-.001.002-.001v0c.002-.001.003-.001.003-.001.001 0 .001 0 .002-.001 0 0 0 0 .001 0l.002-.001c.001 0 .001 0 .001 0 .001 0 .001 0 .002-.001v0c.001 0 .001 0 .002-.001.011-.001.003-.001.003-.001 0-.001.003-.001.002-.001.038-.023.075-.049.11-.078l4.146-3.317c.261-.208.623-.273.94-.167l.557.186-4.133 4.823C14.759 18.745 14.205 19 13.62 19H4V13zM13.761 2.326C13.3 2.832 11 5.457 11 7.5c0 1.93 1.57 3.5 3.5 3.5S18 9.43 18 7.5c0-2.043-2.3-4.668-2.761-5.174C14.86 1.91 14.14 1.91 13.761 2.326zM16 7.5C16 8.327 15.327 9 14.5 9S13 8.327 13 7.5c0-.708.738-1.934 1.5-2.934C15.262 5.566 16 6.792 16 7.5z'></path>
							</svg>
						</h2>
						<p className='text-[#e0fce7] mb-4 text-sm md:text-[13px]'>
							Be the one to make the change in people&apos;s lives
						</p>
					</Link>
				</>

				<div className='w-1/2 h-full rounded-2xl bg-white bg-gradient-to-bl from-[#7C5D25] to-[#C9A53D]  flex flex-col items-center justify-center shadow-lg'>
					<div className='w-[95%] h-[90%] rounded-2xl bg-white m-2  p-6 flex flex-col items-center justify-center '>
						<h2 className='text-black text-xl font-semibold mb-4 flex items-center gap-1'>
							Add funds to your wallet
							<MdWallet size={30} />
						</h2>
						<button
							onClick={openCBOnrampPopup}
							className='bg-gradient-to-bl btn border-0 from-[#7C5D25] to-[#C9A53D] text-white font-bold py-2 px-8 rounded-full shadow transition duration-300 hover:bg-gray-800'
						>
							Add Funds
						</button>
						<p className='text-sm text-gray-500 mt-2 flex gap-2 items-center'>
							Using
							<img src='/cb-text.png' alt='Coinbase Logo' width={70} />
							Onramp
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LeftCards;
