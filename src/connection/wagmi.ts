import { configureChains, mainnet, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()]);

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
});
