import { EthBalance } from '@coinbase/onchainkit/identity';
import { useEffect, useState } from 'react';
import { getCurrencyExchangeRate } from '../apis/exchange-rate';
import { TokenImage } from '@coinbase/onchainkit/token';

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
				<h2 className='text-2xl font-mono'>Your wallet balance</h2>
				<div className='flex gap-x-5 items-baseline justify-center'>
					<EthBalance
						className='text-[3.5em] md:text-[5em] font-mono text-white font-light'
						address={localStorage.getItem('base-wallet-address')}
					/>
					<TokenImage
						token={{
							name: 'ETH',
							address: localStorage.getItem('base-wallet-address'),
							symbol: 'ETH',
							decimals: 6,
							image:
								'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
							chainId: 8453,
						}}
						size={53}
					/>
				</div>
				<p className='font-mono'>1 ETH = ${usd}</p>
			</div>
		</div>
	);
}

export default Banner;
