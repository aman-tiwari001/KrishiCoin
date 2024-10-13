import { base } from 'viem/chains';
import { Address, Avatar, Name } from '@coinbase/onchainkit/identity';
import { useWalletStore } from '../store/WalletStore';
import { Link } from 'react-router-dom';

const BaseName = () => {
	const address =
		useWalletStore((state) => state.address) || localStorage.getItem('base-wallet-address');
	return (
		<div>
			<div className='flex items-center space-x-2 p-2'>
				<img src='/krishi-coin-logo.png' alt='Logo' width={50} />
				<span className='text-green-800 text-3xl font-bold'>Krishi Coin</span>
				<span className='text-2xl flex gap-2'>
					{' '}
					|{' '}
					<a href='http://base.org' target='_blank'>
						<img width={120} src='/base-logo.png' alt='' />
					</a>
				</span>
			</div>
			<h2 className='text-5xl text-center my-14 text-[#283e2f]'>
				Your Basename
			</h2>5
			{address && (
				<div className='flex gap-2 items-center border-2 w-48 mx-auto border-black rounded-full py-1 px-2'>
					<Avatar address={address} chain={base} />
					<div>
						<Name address={address} chain={base} />
						<Address address={address} chain={base} />
					</div>
				</div>
			)}

			<p className='w-[50%] max-sm:w-[85%] mx-auto text-left my-10 text-gray-500'>
				Basename is your human-readable name on the Base blockchain. It is just
				a representation of your wallet address. If you don&apos;t have basename
				then get yours{' '}
				<a
					className='text-blue-600 hover:underline'
					href='https://www.base.org/names'
					target='_blank'
				>
					{' '}
					here↗️{' '}
				</a>
				<br />
				<Link to={'/register'}>
					<button className='btn my-10 btn-primary text-white outline-lime-900 bg-[#283e2f]'>Proceed</button>
				</Link>
			</p>
		</div>
	);
};

export default BaseName;
