import { getChainList } from 'api';
import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { Chain } from 'types';

const GasTapContext = createContext<{
	selectedProvideGasFee: boolean;
	handleSelectProvideGasFee: (selected: boolean) => void;
	chainList: Chain[];
}>({
	selectedProvideGasFee: false,
	handleSelectProvideGasFee: () => {},
	chainList: [],
});

export const GatTapProvider = ({ children }: PropsWithChildren<{}>) => {
	const [selectedProvideGasFee, setSelectProvideGasFee] = useState(false);
	const [chainList, setChainList] = useState<Chain[]>([]);
	const handleSelectProvideGasFee = (selected: boolean) => {
		setSelectProvideGasFee(selected);
	};

	const updateChainList = useCallback(async () => {
		try {
			const newChainList = await getChainList();
			setChainList(newChainList);
		} catch (e) {}
	}, []);

	useEffect(() => {
		updateChainList();
	}, [updateChainList]);

	return (
		<GasTapContext.Provider value={{ selectedProvideGasFee, handleSelectProvideGasFee, chainList }}>
			{children}
		</GasTapContext.Provider>
	);
};

export default GasTapContext;
