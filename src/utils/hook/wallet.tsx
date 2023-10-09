import { useEffect, useState } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect, useNetwork, usePublicClient, useWalletClient } from 'wagmi';

export const useWalletAccount = () => {
	const { address, connector, ...rest } = useAccount();
	const [provider, setProvider] = useState<any>(null);

	useEffect(() => {
		if (connector) connector.getProvider().then(setProvider);
	}, [connector]);

	return {
		address,
		connector,
		provider,
		...rest,
	};
};

export const useWalletNetwork = () => {
	return useNetwork();
};

export const useWalletProvider = (props?: { chainId?: number }) => {
	return usePublicClient(props);
};

export const useWalletSigner = () => {
	return useWalletClient().data;
};

export const useWalletBalance = ({ address, chainId }: { address: any; chainId: number | undefined }) => {
	return useBalance({ address, chainId });
};

export const useWalletDisconnect = () => {
	return useDisconnect();
};

export const useWalletConnect = () => {
	return useConnect();
};
