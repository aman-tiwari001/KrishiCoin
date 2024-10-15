import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrencyExchangeRate } from '../apis/exchange-rate';
import { LoaderIcon } from 'react-hot-toast';

const CurrencyConvertor = ({ from, to, value }) => {
	const [fetching, setFetching] = useState(false);
	const [exchangeRate, setExchangeRate] = useState(0);

	const fetchExRate = async () => {
		try {
			setFetching(true);
			const res = await getCurrencyExchangeRate(from);
			setExchangeRate(parseFloat(res.data.rates[to]));
		} catch (error) {
			console.log('Error fetching exchange rate:', error);
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		fetchExRate();
	}, [from, to, value]);
	return (
		<div>
			{fetching ? (
				<div className='text-sm flex items-center'>
					<LoaderIcon className='my-2 mx-2' /> Fetching exchange rate...
				</div>
			) : (
				<p className='text-sm my-1 text-green-400'>
					= {(value * exchangeRate).toFixed(2)} {to}
				</p>
			)}
		</div>
	);
};

CurrencyConvertor.propTypes = {
	from: PropTypes.string,
	to: PropTypes.string,
	value: PropTypes.number,
};
export default CurrencyConvertor;
