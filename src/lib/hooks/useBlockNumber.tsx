import useIsWindowVisible from 'hooks/useIsWindowVisible';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWalletAccount, useWalletNetwork, useWalletProvider } from 'utils/hook/wallet';

const MISSING_PROVIDER = Symbol();
const BlockNumberContext = createContext<
	| {
			value?: number;
	  }
	| typeof MISSING_PROVIDER
>(MISSING_PROVIDER);

// TODO: refactor please

function useBlockNumberContext() {
	const blockNumber = useContext(BlockNumberContext);
	if (blockNumber === MISSING_PROVIDER) {
		throw new Error('BlockNumber hooks must be wrapped in a <BlockNumberProvider>');
	}
	return blockNumber;
}

/** Requires that BlockUpdater be installed in the DOM tree. */
export default function useBlockNumber(): number | undefined {
	return useBlockNumberContext().value;
}

export function BlockNumberProvider({ children }: { children: ReactNode }) {
	const { chain } = useWalletNetwork();

	const provider = useWalletProvider();

	const [{ chainId, block }, setChainBlock] = useState<{ chainId?: number; block?: number }>({
		chainId: chain?.id,
	});

	const onBlock = useCallback(
		(block: number) => {
			setChainBlock((chainBlock) => {
				if (chainBlock.chainId === chain?.id) {
					if (!chainBlock.block || chainBlock.block < block) {
						return { chainId: chain?.id, block };
					}
				}
				return chainBlock;
			});
		},
		[chain?.id, setChainBlock],
	);

	const windowVisible = useIsWindowVisible();
	useEffect(() => {
		let stale = false;

		if (provider && chain?.id && windowVisible) {
			// If chainId hasn't changed, don't clear the block. This prevents re-fetching still valid data.

			setChainBlock((chainBlock) => (chainBlock.chainId === chain?.id ? chainBlock : { chainId: chain?.id }));

			provider
				.getBlockNumber()
				.then((block: any) => {
					if (!stale) onBlock(block);
				})
				.catch((error: any) => {
					console.error(`Failed to get block number for chainId ${chain.id}`, error);
				});
		}
		return () => {
			stale = true;
		};
	}, [chain?.id, provider, onBlock, setChainBlock, windowVisible]);

	const value = useMemo(
		() => ({
			value: chainId === chain?.id ? block : undefined,
		}),
		[chain?.id, block, chainId],
	);

	return <BlockNumberContext.Provider value={value}>{children}</BlockNumberContext.Provider>;
}
