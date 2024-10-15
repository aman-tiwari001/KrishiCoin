import { ethers } from 'ethers';
import cwfAbi from '../../../contracts/abi/cwf.json';
import p2pAbi from '../../../contracts/abi/p2p.json';
import { toast } from 'react-hot-toast';

export const cwfContractAddress = '0x5F7B8Efb3c8B1836E4d991C51d6379407CC8237b';
export const p2pContractAddress = '0x3759a8212DF0263d670a99b8525A1d2a668B0726';

const desiredNetwork = {
	chainId: '0x14a34',
	chainName: 'Base Sepolia',
	nativeCurrency: {
		name: 'ETH',
		symbol: 'ETH',
		decimals: 18,
	},
	rpcUrls: ['https://sepolia.base.org'],
	blockExplorerUrls: ['https://sepolia-explorer.base.org'],
};

let cwfContract = null;
let p2pContract = null;

if (!window.ethereum) {
	alert('Please install Coinbase wallet to continue!');
} else {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const network = await provider.getNetwork();
	if (network.chainId !== 84532) {
		toast('This dApp only works on Base Sepolia network', { icon: '⚠️' });
		await window.ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [desiredNetwork],
		});
	}
	await provider.send('eth_requestAccounts', []);
	const signer = provider.getSigner();

	cwfContract = new ethers.Contract(cwfContractAddress, cwfAbi, signer);
	p2pContract = new ethers.Contract(p2pContractAddress, p2pAbi, signer);
}
export { cwfContract, p2pContract };
