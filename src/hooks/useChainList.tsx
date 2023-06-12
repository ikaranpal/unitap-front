import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { claimMax, claimMaxNonEVMAPI, getActiveClaimHistory, getChainList } from 'api';
import {
	BrightIdConnectionModalState,
	BrightIdModalState,
	Chain,
	ChainType,
	ClaimBoxState,
	ClaimBoxStateContainer,
	ClaimNonEVMModalState,
	ClaimReceipt,
	HaveBrightIdAccountModalState,
	Network,
	PK,
	UPModalState,
} from 'types';
import { UserProfileContext } from './useUserProfile';
import { RefreshContext } from 'context/RefreshContext';
import getActiveClaimReciept from 'utils/hook/getActiveClaimReciept';
import { searchChainList, searchChainListSimple } from 'utils/hook/searchChainList';
import getCorrectAddress from '../utils/walletAddress';

export const ClaimContext = createContext<{
	chainList: Chain[];
	chainListSearchResult: Chain[];
	chainListSearchSimpleResult: Chain[];
	changeSearchPhrase: ((newSearchPhrase: string) => void) | null;
	claim: (chainPK: number) => void;
	claimNonEVM: (chain: Chain, address: string) => void;
	activeClaimReceipt: ClaimReceipt | null;
	activeClaimHistory: ClaimReceipt[];
	closeClaimModal: () => void;
	openClaimModal: (chainPk: PK) => void;
	activeChain: Chain | null;
	activeNonEVMChain: Chain | null;
	claimBoxStatus: { status: ClaimBoxState; lastFailPk: number | null };
	retryClaim: () => void;
	openBrightIdModal: () => void;
	closeBrightIdModal: () => void;
	openClaimNonEVMModal: () => void;
	closeClaimNonEVMModal: () => void;
	openUPModal: () => void;
	closeUPModal: () => void;
	upModalState: UPModalState;
	brightidModalStatus: BrightIdModalState;
	claimNonEVMModalStatus: ClaimNonEVMModalState;
	openHaveBrightIdAccountModal: () => void;
	closeHaveBrightIdAccountModal: () => void;
	haveBrightIdAccountModalStatus: HaveBrightIdAccountModalState;
	openBrightIdConnectionModal: () => void;
	closeBrightIdConnectionModal: () => void;
	brightIdConnectionModalStatus: BrightIdConnectionModalState;
	selectedNetwork: Network;
	selectedChainType: ChainType;
	setSelectedNetwork: (network: Network) => void;
	setSelectedChainType: (chainType: ChainType) => void;
	claimNonEVMLoading: boolean;
	claimLoading: boolean;
	searchPhrase: string;
	isHighGasFeeModalOpen: boolean;
	changeIsHighGasFeeModalOpen: (isOpen: boolean) => void;
}>({
	chainList: [],
	chainListSearchResult: [],
	chainListSearchSimpleResult: [],
	changeSearchPhrase: null,
	claim: (chainPK: number) => {},
	claimNonEVM: (chain: Chain, address: string) => {},
	activeClaimReceipt: null,
	activeClaimHistory: [],
	closeClaimModal: () => {},
	openClaimModal: (chainPk: PK) => {},
	closeUPModal: () => {},
	openUPModal: () => {},
	upModalState: UPModalState.CLOSED,
	activeChain: null,
	activeNonEVMChain: null,
	claimBoxStatus: { status: ClaimBoxState.CLOSED, lastFailPk: null },
	retryClaim: () => {},
	openBrightIdModal: () => {},
	closeBrightIdModal: () => {},
	openClaimNonEVMModal: () => {},
	closeClaimNonEVMModal: () => {},
	brightidModalStatus: BrightIdModalState.CLOSED,
	claimNonEVMModalStatus: ClaimNonEVMModalState.CLOSED,
	openHaveBrightIdAccountModal: () => {},
	closeHaveBrightIdAccountModal: () => {},
	haveBrightIdAccountModalStatus: HaveBrightIdAccountModalState.CLOSED,
	openBrightIdConnectionModal: () => {},
	closeBrightIdConnectionModal: () => {},
	brightIdConnectionModalStatus: BrightIdConnectionModalState.CLOSED,
	selectedNetwork: Network.MAINNET,
	selectedChainType: ChainType.EVM,
	setSelectedNetwork: (network: Network) => {},
	setSelectedChainType: (chainType: ChainType) => {},
	claimNonEVMLoading: false,
	claimLoading: false,
	searchPhrase: '',
	isHighGasFeeModalOpen: false,
	changeIsHighGasFeeModalOpen: (isOpen: boolean) => {},
});

export function ClaimProvider({ children }: PropsWithChildren<{}>) {
	const [chainList, setChainList] = useState<Chain[]>([]);
	const [searchPhrase, setSearchPhrase] = useState<string>('');

	const [activeClaimHistory, setActiveClaimHistory] = useState<ClaimReceipt[]>([]);
	const [activeClaimReceipt, setActiveClaimReceipt] = useState<ClaimReceipt | null>(null);
	const [claimBoxStatus, setClaimBoxStatus] = useState<ClaimBoxStateContainer>({
		status: ClaimBoxState.CLOSED,
		lastFailPk: null,
	});
	const [brightidModalStatus, setBrightidModalStatus] = useState<BrightIdModalState>(BrightIdModalState.CLOSED);
	const [claimNonEVMModalStatus, setClaimNonEVMModalStatus] = useState<ClaimNonEVMModalState>(
		ClaimNonEVMModalState.CLOSED,
	);
	const [haveBrightIdAccountModalStatus, setHaveBrightIdAccountModalStatus] = useState<HaveBrightIdAccountModalState>(
		HaveBrightIdAccountModalState.CLOSED,
	);
	const [brightIdConnectionModalStatus, setBrightIdConnectionModalStatus] = useState<BrightIdConnectionModalState>(
		BrightIdConnectionModalState.CLOSED,
	);

	const [upModalState, setUPModalState] = useState<UPModalState>(UPModalState.CLOSED);

	const [activeChain, setActiveChain] = useState<Chain | null>(null);
	const [activeNonEVMChain, setActiveNonEVMChain] = useState<Chain | null>(null);

	const [claimNonEVMLoading, setClaimNonEVMLoading] = useState(false);
	const [claimLoading, setClaimLoading] = useState(false);

	const { userProfile, userToken } = useContext(UserProfileContext);
	const { fastRefresh } = useContext(RefreshContext);

	const [isHighGasFeeModalOpen, setIsHighGasFeeModalOpen] = useState(false);
	const changeIsHighGasFeeModalOpen = useCallback((isOpen: boolean) => {
		setIsHighGasFeeModalOpen(isOpen);
	}, []);

	const updateChainList = useCallback(async () => {
		try {
			const newChainList = await getChainList();
			setChainList(newChainList);
		} catch (e) {}
	}, []);

	const updateActiveClaimHistory = useCallback(async () => {
		if (userToken && userProfile) {
			try {
				const newClaimHistory = await getActiveClaimHistory(userToken);
				setActiveClaimHistory(newClaimHistory);
			} catch (e) {}
		}
	}, [userToken, userProfile]);

	useEffect(() => {
		updateChainList();
		updateActiveClaimHistory();
	}, [fastRefresh, updateActiveClaimHistory, updateChainList]);

	useEffect(() => {
		if (activeChain) {
			setActiveClaimReceipt(getActiveClaimReciept(activeClaimHistory, activeChain, 'EVM'));
		} else if (activeNonEVMChain) {
			setActiveClaimReceipt(getActiveClaimReciept(activeClaimHistory, activeNonEVMChain, 'NONEVM'));
		}
	}, [activeChain, activeNonEVMChain, setActiveClaimReceipt, activeClaimHistory]);

	const openClaimModal = useCallback(
		(chainPk: PK) => {
			let chain = chainList.find((chan) => chan.pk === chainPk);
			if (!chain) return;
			if (chain.chainType === ChainType.EVM) {
				setActiveChain(chain);
			} else if (
				chain.chainType === ChainType.NONEVMXDC ||
				chain.chainType === ChainType.SOLANA ||
				chain.chainType === ChainType.LIGHTNING
			) {
				setActiveNonEVMChain(chain);
				setClaimNonEVMModalStatus(ClaimNonEVMModalState.OPENED);
			}
		},
		[chainList],
	);

	const closeClaimModal = useCallback(() => {
		setActiveChain(null);
	}, []);

	const retryClaim = useCallback(() => {
		if (activeClaimReceipt) setClaimBoxStatus({ status: ClaimBoxState.INITIAL, lastFailPk: activeClaimReceipt.pk });
	}, [activeClaimReceipt]);

	const claim = useCallback(
		//TODO: tell user about failing to communicate with server
		async (claimChainPk: number) => {
			if (!userToken || claimLoading) {
				return;
			}
			setClaimLoading(true);
			try {
				await claimMax(userToken, claimChainPk);
				setTimeout(() => {
					setClaimLoading(false);
				}, 1000);
				await updateActiveClaimHistory();
			} catch (ex) {
				setClaimLoading(false);
				await updateActiveClaimHistory();
			}
		},
		[userToken, updateActiveClaimHistory, claimLoading],
	);

	const claimNonEVM = useCallback(
		async (chain: Chain, address: string) => {
			if (!userToken || claimNonEVMLoading) {
				return;
			}
			setClaimNonEVMLoading(true);
			try {
				let correctAddress = getCorrectAddress(chain, address);
				await claimMaxNonEVMAPI(userToken, chain.pk, correctAddress);
				setTimeout(() => {
					setClaimNonEVMLoading(false);
				}, 1000);
				await updateActiveClaimHistory();
			} catch (ex) {
				setClaimNonEVMLoading(false);
				await updateActiveClaimHistory();
			}
		},
		[userToken, updateActiveClaimHistory, claimNonEVMLoading],
	);

	const [selectedNetwork, setSelectedNetwork] = React.useState(Network.MAINNET);
	const [selectedChainType, setSelectedChainType] = React.useState(ChainType.ALL);

	const chainListSearchResult = useMemo(
		() => searchChainList(searchPhrase, chainList, selectedNetwork, selectedChainType),
		[searchPhrase, chainList, selectedNetwork, selectedChainType],
	);

	const chainListSearchSimpleResult = useMemo(
		() => searchChainListSimple(searchPhrase, chainList),
		[searchPhrase, chainList],
	);

	const changeSearchPhrase = (newSearchPhrase: string) => {
		setSearchPhrase(newSearchPhrase);
	};

	const openBrightIdModal = () => {
		setBrightidModalStatus(BrightIdModalState.OPENED);
	};
	const closeBrightIdModal = () => {
		setBrightidModalStatus(BrightIdModalState.CLOSED);
	};

	const closeUPModal = () => {
		setUPModalState(UPModalState.CLOSED);
	};

	const openUPModal = () => {
		setUPModalState(UPModalState.OPENED);
	};

	const openClaimNonEVMModal = () => {
		setClaimNonEVMModalStatus(ClaimNonEVMModalState.OPENED);
	};
	const closeClaimNonEVMModal = () => {
		setActiveNonEVMChain(null);
		setClaimNonEVMModalStatus(ClaimNonEVMModalState.CLOSED);
	};

	const openHaveBrightIdAccountModal = () => {
		setHaveBrightIdAccountModalStatus(HaveBrightIdAccountModalState.OPENED);
	};
	const closeHaveBrightIdAccountModal = () => {
		setHaveBrightIdAccountModalStatus(HaveBrightIdAccountModalState.CLOSED);
	};

	const openBrightIdConnectionModal = () => {
		setBrightIdConnectionModalStatus(BrightIdConnectionModalState.OPENED);
	};
	const closeBrightIdConnectionModal = () => {
		setBrightIdConnectionModalStatus(BrightIdConnectionModalState.CLOSED);
	};

	return (
		<ClaimContext.Provider
			value={{
				chainList,
				chainListSearchResult,
				chainListSearchSimpleResult,
				changeSearchPhrase,
				claim,
				claimNonEVM,
				activeClaimReceipt,
				activeClaimHistory,
				openClaimModal,
				closeClaimModal,
				activeChain,
				activeNonEVMChain,
				claimBoxStatus,
				retryClaim,
				openBrightIdModal,
				closeBrightIdModal,
				openUPModal,
				closeUPModal,
				upModalState,
				openClaimNonEVMModal,
				closeClaimNonEVMModal,
				brightidModalStatus,
				claimNonEVMModalStatus,
				openHaveBrightIdAccountModal,
				closeHaveBrightIdAccountModal,
				haveBrightIdAccountModalStatus,
				openBrightIdConnectionModal,
				closeBrightIdConnectionModal,
				brightIdConnectionModalStatus,
				selectedNetwork,
				setSelectedNetwork,
				selectedChainType,
				setSelectedChainType,
				claimNonEVMLoading,
				claimLoading,
				searchPhrase,
				isHighGasFeeModalOpen,
				changeIsHighGasFeeModalOpen,
			}}
		>
			{children}
		</ClaimContext.Provider>
	);
}
