import { create } from 'zustand';

export const useWalletStore = create((set) => ({
	address: 0,
	setAddress: (newAddress) => set(() => ({ address: newAddress })),
}));
