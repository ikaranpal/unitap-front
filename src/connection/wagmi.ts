import { configureChains, createConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import {
	avalanche,
	bsc,
	polygon,
	mainnet,
	polygonMumbai,
	fantom,
	holesky,
	goerli,
	bscTestnet,
	sepolia,
	gnosis,
} from '@wagmi/core/chains';

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, avalanche, bsc, polygon, polygon, fantom, holesky, goerli, polygonMumbai, bscTestnet, sepolia, gnosis],
	[
		jsonRpcProvider({
			rpc(chain) {
				return {
					webSocket: chain.rpcUrls.public.webSocket ? chain.rpcUrls.public.webSocket[0] : undefined,
					http: chain.rpcUrls.public.http[0],
				};
			},
		}),
	],
);

export const config = createConfig({
	autoConnect: true,
	publicClient,
	webSocketPublicClient,
	connectors: [
		new InjectedConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'unitap',
				appLogoUrl: 'https://unitap.app/favicon.ico',
				darkMode: true,
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				projectId: '31516b299852311acdc936c61cd7892c',
			},
		}),
	],
	logger: {
		warn: (message) => console.warn(message),
	},
});
