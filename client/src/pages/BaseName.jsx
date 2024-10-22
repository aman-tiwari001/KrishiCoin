import { base } from 'viem/chains';
import { Address, Avatar, Name } from '@coinbase/onchainkit/identity';
import { useWalletStore } from '../store/WalletStore';
import toast from 'react-hot-toast';
import { checkUser } from '../apis/auth';
import { useNavigate } from 'react-router-dom';

const BaseName = () => {
	const navigate = useNavigate();
	const address =
		useWalletStore((state) => state.address) ||
		localStorage.getItem('base-wallet-address');

	const handleCheckUser = async () => {
		try {
			const res = await checkUser(address);
			if (res.exist) {
				localStorage.setItem('token', res.token);
				localStorage.setItem('userId', res.user._id);
				navigate('/home');
			} else {
				navigate('/register');
			}
		} catch (error) {
			console.error('Error checking user:', error);
			toast.error('Error checking user');
		}
	};
	return (
		<div>
			<div className='flex items-center space-x-2 p-2'>
				<img src='/krishi-coin-logo.png' alt='Logo' width={50} />
				<span className='text-green-800 text-3xl font-bold'>KrishiCoin</span>
				<span className='text-2xl flex gap-2'>
					{' '}
					|{' '}
					<a href='http://base.org' target='_blank'>
						<img width={120} src='/base-logo.png' alt='' />
					</a>
				</span>
			</div>
			<h2 className='text-5xl text-center mt-14 mb-7 text-[#283e2f] flex justify-center items-center gap-4'>
				Your
				<div className='bg-[#0052FF] h-10 w-10 rounded-full'></div>
				Basename
			</h2>

			{address && (
				<div className='flex gap-2 items-center border-2 w-48 mx-auto border-black rounded-full min-h-12 px-2'>
					<Avatar
						loadingComponent={
							<img
								src='/loader.png'
								width={48}
								className='animate-spin mx-auto text-center'
							/>
						}
						address={address}
						chain={base}
					/>
					<div>
						<Name address={address} chain={base} />
						<Address address={address} chain={base} />
					</div>
				</div>
			)}
			<p className='w-[50%] max-sm:w-[85%] mx-auto text-left my-10 text-gray-500'>
				Basename is your human-readable name on the Base blockchain. It is just
				a representation of your wallet address. It is an effective way to get
				people onchain. If you don&apos;t have basename then get yours{' '}
				<a
					className='text-blue-600 hover:underline'
					href='https://www.base.org/names'
					target='_blank'
				>
					{' '}
					here↗️{' '}
				</a>
				<br />
				<button
					onClick={handleCheckUser}
					className='btn my-10 btn-primary text-white hover:bg-[#476e52] border-black hover:border-black bg-[#283e2f]'
				>
					Proceed
				</button>
			</p>
		</div>
	);
};

export default BaseName;
