import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

export const crowdfundingContractAddress = "0x642b2F32ADEb45b295fd9001EB380D2ba2F4c431";
export const p2pContractAddress = "0x3759a8212DF0263d670a99b8525A1d2a668B0726";

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
 });

export const crowdfundingContract = getContract({
  client,
  chain: baseSepolia,
  address: crowdfundingContractAddress,
});

export const p2pContract = getContract({
  client,
  chain: baseSepolia,
  address: p2pContractAddress,
});