import { defineConfig } from '@wagmi/cli';
import { etherscan, react } from '@wagmi/cli/plugins';
import { erc20ABI } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import * as UnitapPass from './src/abis/UnitapPass.json';

export default defineConfig({
	out: 'types/abis/generated.ts',
	contracts: [
		{
			name: 'erc20',
			abi: erc20ABI,
		},
		{
			abi: UnitapPass as any,
			name: 'UnitapPass',
		},
	],
	plugins: [
		etherscan({
			apiKey: process.env.ETHERSCAN_API_KEY!,
			chainId: mainnet.id,
			contracts: [],
		}),
		react(),
	],
});
