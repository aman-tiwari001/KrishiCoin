import { EthBalance } from '@coinbase/onchainkit/identity';
import { useEffect, useState } from 'react';
import { getCurrencyExchangeRate } from '../apis/exchange-rate';

function Banner() {
	const [usd, setUSD] = useState('0.00');

	const ethBal = EthBalance({
		address: localStorage.getItem('base-wallet-address'),
	});
	console.log(ethBal);
	useEffect(() => {
		getCurrencyExchangeRate('ETH')
			.then((data) => setUSD(data.data.rates.USD))
			.catch((error) => console.error('Error getting exchange rate:', error));
	}, [usd]);
	return (
		<div className='w-full mt-6 h-[40vh] bg-red-500 flex justify-center items-center rounded-2xl banner-bg'>
			<div className='text-center'>
				<h2 className='text-2xl'>Your wallet balance</h2>
				<EthBalance
					className='text-[3.5em] md:text-[5em] font-mono text-white font-light'
					address={localStorage.getItem('base-wallet-address')}
				/>
				<p className='font-mono'>1 ETH = ${usd}</p>
			</div>
		</div>
	);
}

export default Banner;
