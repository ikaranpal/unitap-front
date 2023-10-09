import { useEffect, useState } from 'react';
import { PublicClient } from 'viem';
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

export type EstimateGasProps = {
	from: string;
	to: string;
	value?: bigint;
	data?: string;
};

export const estimateGas = (provider: PublicClient, { from, to, value, data }: EstimateGasProps) => {
	return provider.estimateGas({
		account: from as `0x{string}`,
		to: to as `0x{string}`,
		value,
		data: data as `0x{string}`,
	});
};

export const callProvider = (provider: PublicClient, { from, to, value, data }: EstimateGasProps) => {
	return provider.call({
		account: from as `0x{string}`,
		to: to as `0x{string}`,
		value,
		data: data as `0x{string}`,
	});
};
