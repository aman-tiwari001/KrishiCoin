import { cwfContractAddress, p2pContractAddress } from "../utils/contract";
import cwfAbi from '../../../contracts/abi/cwf.json';
import p2pAbi from '../../../contracts/abi/p2p.json';
 
export const contracts = [
  {
    address: cwfContractAddress,
    abi: cwfAbi,
    functionName: 'click',
    args: [],
  },
  {
    address: p2pContractAddress,
    abi: p2pAbi,
    functionName: 'click',
    args: [],
  },
];