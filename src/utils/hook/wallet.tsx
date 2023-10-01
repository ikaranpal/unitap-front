import { useEffect, useState } from 'react';
import { useAccount, useNetwork, usePublicClient } from 'wagmi';

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

export const useWalletProvider = () => {
	return usePublicClient();
};
