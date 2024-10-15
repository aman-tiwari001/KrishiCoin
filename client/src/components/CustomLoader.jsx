import PropTypes from 'prop-types';

const CustomLoader = ({ size }) => {
	return (
		<img
			className='text-center mx-auto animate-spin'
			src='/loader.png'
			width={size || 47}
			alt='Loading...'
		/>
	);
};

CustomLoader.propTypes = {
	size: PropTypes.number,
};

export default CustomLoader;
