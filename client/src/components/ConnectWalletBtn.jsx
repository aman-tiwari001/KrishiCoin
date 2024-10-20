import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { CoinbaseWalletLogo } from './CoinBaseWalletLogo.jsx';
const buttonStyles = {
	background: 'transparent',
	border: '1px solid transparent',
	boxSizing: 'border-box',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'between',
  gap: 10,
	width: 200,
	fontFamily: 'Arial, sans-serif',
	fontSize: 18,
	backgroundColor: '#0052FF',
	paddingLeft: 15,
	paddingRight: 30,
  paddingTop: 10,
  paddingBottom: 10,
	borderRadius: 10,
  color: 'white',
};

const sdk = new CoinbaseWalletSDK({
	appName: 'KrishiCoin',
	appLogoUrl: '/krishi-coin-logo.png',
	appChainIds: [84532],
});

const provider = sdk.makeWeb3Provider();

const ConnectWalletBtn = ({ handleSuccess, handleError }) => {
	const createWallet = useCallback(async () => {
		try {
			const [address] = await provider.request({
				method: 'eth_requestAccounts',
			});
			handleSuccess(address);
		} catch (error) {
      handleError(error);
    }
	}, [handleSuccess, handleError]);

	return (
		<button style={buttonStyles} onClick={createWallet}>
			<CoinbaseWalletLogo />
			Get Started
		</button>
	);
}

export default ConnectWalletBtn;

ConnectWalletBtn.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};
