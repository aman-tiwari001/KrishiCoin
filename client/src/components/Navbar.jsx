import { Link } from 'react-router-dom';
import WalletComponent from './WalletComponent';
import SwapComponent from './SwapComponent';

const Navbar = () => {
	const NavItems = [
		{
			name: 'Home',
			link: '/',
		},
		{
			name: 'Donate',
			link: '/donate',
		},
		{
			name: 'Market',
			link: '/market',
		},
		{
			name: 'Dashboard',
			link: '/dashboard',
		},
		{
			name: 'Blog',
			link: '/blog',
		},
	];
	return (
		<div className='bg-[#E0FCE7] bg-cover w-full h-[80px] z-20 fixed top-0 flex items-center justify-between py-2 px-6 shadow-md'>
			<Link to={'/home'}>
				<div className='flex items-center space-x-2 '>
					<img src='/krishi-coin-logo.png' alt='Logo' className='h-12' />
					<span className='text-green-900 text-[32px] font-bold max-md:hidden'>
						KrishiCoin
					</span>
				</div>
			</Link>

			<div className='flex justify-center items-center gap-2'>
				<button
					className='btn bg-theme text-white '
					onClick={() => document.getElementById('my_modal_1').showModal()}
				>
					🪙 Swap
				</button>
				<dialog id='my_modal_1' className='modal'>
					<div className='modal-box bg-white'>
						<p className='text-black text-xl'>Swap your tokens without leaving KrishiCoin!</p>
						<SwapComponent />
						<div className='modal-action w-full'>
							<form method='dialog' className='w-full'>
								{/* if there is a button in form, it will close the modal */}
								<button className='btn w-full text-white border-green-500 bg-green-500 hover:bg-green-600'>Close</button>
							</form>
						</div>
					</div>
				</dialog>
				<div className='dropdown'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-ghost btn-circle bg-[#209b2e] hover:bg-[#1b522197] transition-all duration-300'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 '
							fill='black'
							viewBox='0 0 24 24'
							stroke='white'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16M4 18h7'
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-lime-400'
					>
						{NavItems.map((item, index) => (
							<li key={index}>
								<Link
									to={item.link}
									className='menu-title text-green-700 rounded-lg hover:bg-lime-100 transition-all hover:shadow-lg'
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className='flex items-center space-x-6 border-theme border-[3px] rounded-2xl text-gray-600'>
					<WalletComponent />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
