import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ConnectWalletBtn from '../components/ConnectWalletBtn';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const features = [
	{
		title: 'Make a Donation',
		description:
			'Support the farming community by directly contributing to ongoing projects and causes. Your donations help improve agricultural practices, purchase equipment, and provide resources to farmers in need, empowering them to grow sustainably.',
	},
	{
		title: 'Start a Fundraiser',
		description:
			"Create a crowdfunding campaign for any agricultural cause. Whether it's to raise money for a new farming project, machinery, or community-driven initiatives, farmers can start fundraisers and gather support from people all over the world.",
	},
	{
		title: 'Get a Loan',
		description:
			'Request a loan from the community with a set interest rate. Farmers can ask for financial help, detailing the purpose of the loan and the repayment terms. Community members can contribute small amounts towards fulfilling the loan request.',
	},
	{
		title: 'Lend Money',
		description:
			'Lend money to farmers seeking financial assistance. As a lender, you will earn a fixed interest rate on your contributions while directly supporting the agricultural sector. Help farmers grow their business while earning interest on your investments.',
	},
	{
		title: 'P2P Lending',
		description:
			'Engage in peer-to-peer lending where borrowers and lenders can negotiate interest rates. Farmers needing urgent financial support can connect with potential lenders to agree on terms that suit both parties, ensuring flexible and fair transactions.',
	},
	{
		title: 'Community Writes',
		description:
			'A blog section created by the farmers, for the farmers. Read insightful articles, personal experiences, and tips from the farming community. Share knowledge, discover new techniques, and stay connected with agricultural advancements.',
	},
];

const LadderFeature = ({ title, description, index }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			className='mb-16 flex items-center'
			initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
			animate={isInView ? { opacity: 1, x: index % 2 === 0 ? 0 : 0 } : {}}
			transition={{ duration: 1, delay: index * 0.2 }}
		>
			<div className='w-10 h-full bg-blue-00 rounded-l-full relative'>
				<motion.div
					className='w-10 h-10 bg-white rounded-full border-2 border-green-500 absolute top-1/2 left-0 transform -translate-y-1/2'
					initial={{ rotate: index % 2 === 0 ? 45 : -45 }}
					whileInView={{ rotate: 0 }}
					transition={{ type: 'spring', stiffness: 100 }}
				/>
			</div>

			{/* Feature description */}
			<div className='ml-11 bg-cyan-00 text-left'>
				<h3 className='text-2xl font-bold text-gray-800'>{title}</h3>
				<p className='text-gray-600 w-[46vw]  bg-slate-100 p-3 rounded-e-2xl rounded-b-2xl border-gray-100 border-[10px] mt-2'>
					{description}
				</p>
			</div>
		</motion.div>
	);
};

const LandingPage = () => {
	const navigate = useNavigate();
	const walletSuccessHandler = (address) => {
		console.log(`Wallet connected: ${address}`);
		navigate('/home');
	};
	const walletErrorHandler = (error) => {
		console.error(`Wallet connection error: ${error.message}`);
    alert('Wallet connection error. Please try again.');
	};

	return (
		<div className='min-h-screen bg-white text-gray-900'>
			<div className='z-0 absolute h-screen w-screen'>
				<img
					className=' h-screen w-screen'
					src='https://www.deere.co.in/assets/images/region-1/products/John%20Deere_Website%20Creatives_Tractor%20Finance_Internal.jpg'
				/>
			</div>
			<div className=' z-20 absolute top-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-[0.6] h-screen w-screen flex items-center justify-center'></div>
			<section className='h-screen flex items-center justify-center'>
				<div className='text-center z-50'>
					<motion.h1
						className='text-7xl font-bold text-white'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
					>
						Welcome to KrishiCoin
					</motion.h1>
					<motion.p
						className='mt-4 text-2xl text-gray-100'
						initial={{ x: '-100vw' }}
						animate={{ x: 0 }}
						transition={{ type: 'spring', delay: 0.5 }}
					>
						Empowering Farmers Through Blockchain Microfinance
					</motion.p>
					<motion.button
						className='mt-8 bg-white text-green-500 text-lg px-6 py-3 rounded-lg shadow-lg'
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.2 }}
					>
						{/* <Link to='/home'>Get Started</Link> */}
						<ConnectWalletBtn
							handleSuccess={walletSuccessHandler}
							handleError={walletErrorHandler}
						/>
					</motion.button>
				</div>
			</section>

			<section className='py-20 bg-white'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold mb-12'>Features</h2>

					<div className='relative'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
							<div className='relative h-full'>
								<div className='absolute top-0 left-1/2 md:left-0 h-full w-10 bg-green-50 rounded-full'></div>
								{features.map((feature, index) => (
									<LadderFeature
										key={index}
										index={index}
										title={feature.title}
										description={feature.description}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='py-20 bg-white'>
				<div className='max-w-7xl mx-auto px-4 text-center'>
					<h2 className='text-3xl font-bold mb-12'>How It Works</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<motion.div
							className='p-6 bg-gray-100 shadow-lg rounded-md'
							whileHover={{ y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<h3 className='text-xl font-semibold'>Step 1: Join KrishiCoin</h3>
							<p>Sign up to start supporting the farming community.</p>
						</motion.div>

						<motion.div
							className='p-6 bg-gray-100 shadow-lg rounded-md'
							whileHover={{ y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<h3 className='text-xl font-semibold'>
								Step 2: Explore Features
							</h3>
							<p>
								Donate, lend, or borrow through our blockchain-based platform.
							</p>
						</motion.div>

						<motion.div
							className='p-6 bg-gray-100 shadow-lg rounded-md'
							whileHover={{ y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<h3 className='text-xl font-semibold'>Step 3: Contribute</h3>
							<p>Contribute to fundraisers or loan requests with a click.</p>
						</motion.div>

						<motion.div
							className='p-6 bg-gray-100 shadow-lg rounded-md'
							whileHover={{ y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<h3 className='text-xl font-semibold'>
								Step 4: Be a Part of the Change
							</h3>
							<p>Help farmers and grow the KrishiCoin community.</p>
						</motion.div>
					</div>
				</div>
			</section>

			<section className='py-20 bg-gradient-to-r from-blue-500 to-green-400'>
				<div className='max-w-7xl mx-auto px-4 text-center text-white'>
					<h2 className='text-4xl font-bold mb-6'>
						Ready to Help the Farmer Community?
					</h2>
					<motion.button
						className='mt-8 bg-white text-green-500 px-8 py-4 rounded-lg font-medium text-lg shadow-lg'
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.2 }}
					>
						Join KrishiCoin Now
					</motion.button>
				</div>
			</section>
		</div>
	);
};

LadderFeature.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	index: PropTypes.number,
};

export default LandingPage;
