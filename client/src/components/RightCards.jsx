import { MdMenuBook, MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

function RightCards() {
	return (
		<div className='w-full md:w-[60%] h-[50vh] flex flex-col gap-2 md:py-4'>
			{/* Top Card */}
			<div className='w-full h-1/2 flex items-center gap-2'>
				<Link
					to='/sell'
					className='w-1/2 h-1/2 cards4-bg md:h-full bg-[#A9D6E5] rounded-2xl flex flex-col justify-evenly shadow-lg'
				>
					<div className='w-[100%] h-[100%] z-50 bg-black flex flex-col pb-4 justify-center shadow-lg opacity-[0.55] px-4 py-6 rounded-2xl'>
						<h2 className='text-white text-xl flex items-cente gap-2 font-bold'>
							Sell Crops
						</h2>
						<p className='text-sm'>
							Sell crops directly to companies elimintaing all middlemen
						</p>
					</div>
				</Link>
				<Link
					to='/market'
					className='w-1/2 h-1/2 md:h-full rounded-2xl cards3-bg flex flex-col items-center justify-center shadow-lg'
				>
					<div className='w-[100%] h-[100%] z-50 bg-black flex flex-col justify-center shadow-lg opacity-[0.8] pl-6 py-6 rounded-2xl  '>
						<h2 className='text-white top-4 max-md:text-sm text-xl font-bold flex items-start gap-2'>
							P2P Marketplace
							<MdShoppingCart size={30} />
						</h2>
						<p className='text-sm mr-2'>
							Buy crops directly from the farms at reasonale price!
						</p>
					</div>
				</Link>
			</div>

			{/* 3 small cards */}
			<div className='flex w-full h-1/2 gap-2'>
				<Link
					to='/campaignform'
					className='w-2/4 md:h-full z-50 bg-[#778457] flex flex-col items-start justify-center shadow-lg opacity-[0.8] px-10 max-md:px-4 py-6 rounded-2xl  '
				>
					<h2 className='text-[#e0fce7] text-[20px] md:text-xl font-semibold flex gap-2 mb-4'>
						Start Your Fundraiser
						<svg
							stroke='currentColor'
							fill='currentColor'
							viewBox='0 0 1024 1024'
							height='1.3em'
							width='1.3em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM512 196.7l271.1 197.2H240.9L512 196.7zM264 462h117v374H264V462zm189 0h117v374H453V462zm307 374H642V462h118v374z'></path>
						</svg>
					</h2>
					<p className='text-[#e0fce7] mb-4 text-[17px] md:text-[13px]'>
						Raise funds from the community for the cause that matters most!
					</p>
				</Link>
				<div className='w-full bg-[#19747E] cards2-bg rounded-2xl  '>
					<div className='w-[100%] h-[100%] bg-gradient-to-br from-[#20705b] to-[#012513] flex flex-col items-center justify-center shadow-lg opacity-[0.85] px-4 py-6 rounded-2xl  '>
						<h2 className='text-[#e0fce7] text-2xl font-semibold mb-4 flex items-center gap-2'>
							Community Writes
							<MdMenuBook />
						</h2>
						<p className='text-[#e0fce7] text-left text-sm mb-4'>
							Be part of a vibrant community where you can connect, share, and
							grow together. Explore the interesting blogs, articles and posts
							in your community.
						</p>
						<Link to={'/blog'}>
							<button className='bg-black text-white font-bold py-1 mt-[-9px] px-6 rounded-full shadow transition duration-300 hover:bg-gray-700'>
								Explore
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RightCards;
