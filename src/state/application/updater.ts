import useDebounce from 'hooks/useDebounce';
import useIsWindowVisible from 'hooks/useIsWindowVisible';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'state/hooks';
import { supportedChainId } from 'utils/supportedChainId';

import { updateChainId } from './reducer';
import { useWalletAccount, useWalletNetwork } from 'utils/hook/wallet';

export default function Updater(): null {
	const { connector } = useWalletAccount();
	const { chain } = useWalletNetwork();

	const dispatch = useAppDispatch();
	const windowVisible = useIsWindowVisible();

	const [activeChainId, setActiveChainId] = useState(chain?.id);

	useEffect(() => {
		if (connector && chain?.id && windowVisible) {
			setActiveChainId(chain.id);
		}
	}, [dispatch, chain?.id, connector, windowVisible]);

	const debouncedChainId = useDebounce(activeChainId, 100);

	useEffect(() => {
		const chainId = debouncedChainId ? supportedChainId(debouncedChainId) ?? null : null;
		dispatch(updateChainId({ chainId }));
	}, [dispatch, debouncedChainId]);

	return null;
}
