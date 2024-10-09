import {
	ConnectWallet,
	Wallet,
	WalletDropdown,
	WalletDropdownBasename,
	WalletDropdownFundLink,
	WalletDropdownLink,
	WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
	Address,
	Avatar,
	Name,
	Identity,
	EthBalance,
} from '@coinbase/onchainkit/identity';

const WalletComponent = () => {
	return (
		<Wallet>
			<ConnectWallet>
				<div  className='flex items-center gap-2'>
					<Avatar />
					<div className='flex flex-col items-start'>
						<Address />
						<EthBalance />
					</div>
				</div>
			</ConnectWallet>
			<WalletDropdown className='z-[100]'>
				<Identity className='px-4 pt-3 pb-2 z-[100]' hasCopyAddressOnClick>
					<Avatar />
					<Name />
					<Address />
					<EthBalance />
				</Identity>
				<WalletDropdownBasename />
				<WalletDropdownLink icon='wallet' href='https://keys.coinbase.com'>
					Wallet
				</WalletDropdownLink>
				<WalletDropdownFundLink />
				<WalletDropdownDisconnect />
			</WalletDropdown>
		</Wallet>
	);
};

export default WalletComponent;
