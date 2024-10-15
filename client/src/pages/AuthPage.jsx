import { useName } from '@coinbase/onchainkit/identity';
import { useForm } from 'react-hook-form';
import toast, { LoaderIcon } from 'react-hot-toast';
import { base } from 'viem/chains';
import { registerUser } from '../apis/auth';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
	const { data: name, isLoading } = useName({
		address: localStorage.getItem('base-wallet-address'),
		chain: { base },
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			wallet_address: localStorage.getItem('base-wallet-address'),
			basename: name || localStorage.getItem('base-wallet-address'),
		},
	});

  const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const res = await registerUser(data);
			localStorage.setItem('token', res.token);
      navigate('/home');
      toast.success('User registered');
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className='pt-28 text-black'>
			<h1 className='text-center text-4xl'>Create your account ✅</h1>
			<div className='flex w-full items-center justify-center gap-x-36'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col items-start gap-y-4 my-16 '
				>
					<div className='w-full'>
						<label htmlFor='wallet_address'>Wallet Address : </label>
						<br />
						<input
							className='input input-bordered w-[400px] max-w-xs disabled:text-gray-500 disabled:bg-white'
							id='wallet_address'
							disabled
							defaultValue={localStorage.getItem('base-wallet-address')}
						/>
						{errors?.wallet_address && (
							<p className='text-red-400'>{errors.wallet_address.message}</p>
						)}
					</div>
					<div className='w-full'>
						<label htmlFor='basename'>Basename : </label>
						<br />
						<input
							disabled
							defaultValue={name || localStorage.getItem('base-wallet-address')}
							className='input input-bordered w-full max-w-xs bg-white disabled:text-gray-500 disabled:bg-white'
							id='basename'
						/>
						<p>
							{isLoading && (
								<div className='flex text-sm text-gray-500 items-center gap-2 mt-1'>
									<LoaderIcon /> Fetching your basename...
								</div>
							)}
						</p>
						{errors?.basename && (
							<p className='text-red-400'>{errors.basename.message}</p>
						)}
					</div>
					<div className='w-full'>
						<label htmlFor='name'>Name : </label>
						<br />
						<input
							className='input input-bordered w-full max-w-xs bg-white'
							id='name'
							{...register('name', { required: 'Name is required' })}
						/>
						{errors?.name && (
							<p className='text-red-400'>{errors.name.message}</p>
						)}
					</div>
					<div className='w-full'>
						<label htmlFor='phone'>Phone : </label>
						<br />
						<input
							className='input input-bordered w-full max-w-xs bg-white'
							id='phone'
							type='number'
							{...register('phone', {
								required: 'Phone is required',
								maxLength: {
									value: 10,
									message: 'Phone number must be 10 digits',
								},
								minLength: {
									value: 10,
									message: 'Phone number must be 10 digits',
								},
							})}
						/>
						{errors?.phone && (
							<p className='text-red-400'>{errors.phone.message}</p>
						)}
					</div>
					<button
						disabled={isLoading}
						className='btn disabled:text-gray-500 btn-accent text-white'
						type='submit'
					>
						Register
					</button>
				</form>
				<div className='max-sm:hidden'>
					<img src='/farmer2.png' width={450} alt='farmer' />
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
