import { getChainList } from 'api';
import {
	createContext,
	useState,
	useEffect,
	PropsWithChildren,
	useCallback,
	SetStateAction,
	useMemo,
	useContext,
} from 'react';
import { Chain, ProviderDashboardFormDataProp } from 'types';
import { UserProfileContext } from 'hooks/useUserProfile';
import { useWeb3React } from '@web3-react/core';
import {
	checkRegexDateValidation,
	checkEndDate,
	checkStartDate,
	convertStringToDate,
} from './utils/checkDateValidation';
import { useUnitapProviderDashboardCallback } from 'hooks/providerDashboard/useUnitapProviderDashboardCallback';
import { ZERO_ADDRESS } from 'constants/addresses';
import { getContract, isAddress } from 'utils';
import Erc20_ABI from '../../../../abis/Erc20.json';
export enum RequirementTypes {
	NFT = 'NFT',
	BRIGHT_ID = 'BrightId',
}

interface ModalItemProps {
	name: string;
	label: string;
	imageSrc: string;
	isOpen: boolean;
}

export const modalItems: ModalItemProps[] = [
	{ name: 'nft', label: 'NFT', imageSrc: 'nft', isOpen: false },
	{ name: 'brightId', label: 'BrightId', imageSrc: 'brightId', isOpen: false },
];

interface RequirementType {
	type: RequirementTypes;
}

export interface NftRequirementProp extends RequirementType {
	nftRequirementSatisfy: boolean | null;
	nftRequirementSelectedChain: Chain | null;
	nftRequirementNftAddress: string | null;
	nftRequirementMax: number;
	nftRequirementMin: number;
	nftRequirementCustomID: number | null;
}

export interface BrightIdRequirementProp extends RequirementType {
	brightIdRequirementSatisfy: boolean | null;
	brightIdRequirementType: string | null;
}

type RequirementProps = NftRequirementProp | BrightIdRequirementProp;

const initData: ProviderDashboardFormDataProp = {
	provider: '',
	description: '',
	isNft: false,
	isNativeToken: false,
	tokenAmount: '',
	tokenContractAddress: '',
	nftContractAddress: null,
	nftTokenId: null,
	selectedChain: null,
	startTime: '',
	startTimeStamp: '',
	endTime: '',
	endTimeStamp: '',
	limitEnrollPeopleCheck: false,
	maximumNumberEnroll: null,
	email: '',
	twitter: '',
	discord: '',
	creatorUrl: '',
	necessaryInfo: '',
	satisfy: 'satisfyAll',
	allowListPrivate: false,
	setDuration: false,
	numberOfDuration: 0,
	durationUnitTime: 'Month',
	NftSatisfy: false,
	decimal: null,
	tokenName: null,
	tokenSymbol: null,
	tokenDecimals: null,
	userTokenBalance: undefined,
};

const title = {
	0: 'Prize Info',
	1: 'Time Limitation',
	2: 'Requirements',
	4: 'Contact Info',
	5: 'Deposit Prize',
	6: 'Information Verification',
};

const errorMessages = {
	required: 'Required',
	invalidFormat: 'invalid Format',
	startTimeDuration: 'The start time must be at least 1 week after now.',
	endDateUnacceptable: 'End date is unacceptable.',
};

interface ErrorObjectProp {
	startDateStatus: null | boolean;
	statDateStatusMessage: null | string;
	endDateStatus: null | boolean;
	endDateStatusMessage: null | string;
	numberOfDurationStatus: null | boolean;
	numberOfDurationMessage: null | string;
	maximumLimitationStatus: null | boolean;
	maximumLimitationMessage: null | string;
}

const PrizeOfferFormContext = createContext<{
	page: number;
	setPage: (page: number) => void;
	data: ProviderDashboardFormDataProp;
	requirementModalItems: ModalItemProps[];
	title: any;
	canSubmit: boolean;
	handleChange: (e: any) => void;
	handleSelectTokenOrNft: (e: boolean) => void;
	handleSelectLimitEnrollPeopleCheck: () => void;
	openRequirementModal: () => void;
	closeRequirementModal: () => void;
	openCreteRaffleModal: () => void;
	closeCreateRaffleModal: () => void;
	openShowPreviewModal: () => void;
	closeShowPreviewModal: () => void;
	handleSelectRequirementModal: (title: string) => void;
	isModalOpen: boolean;
	requirementTitle: string | null;
	handleBackToRequirementModal: () => void;
	chainList: Chain[];
	selectedChain: Chain | null;
	setSelectedChain: (chain: Chain) => void;
	chainName: string;
	handleSearchChain: (e: any) => void;
	setChainName: (e: string) => void;
	filterChainList: Chain[];
	setSearchPhrase: (e: string) => void;
	handleSelectChain: (chain: Chain) => void;
	handleSelectSatisfy: (satisfy: string) => void;
	allowListPrivate: boolean;
	handleSelectAllowListPrivate: () => void;
	canGoStepTwo: () => boolean;
	canGoStepThree: () => void;
	canGoStepFive: () => boolean;
	setDuration: boolean;
	handleSetDuration: (e: boolean) => void;
	handleSetDurationManually: () => void;
	handleSelectDurationUnitTime: (unit: string) => void;
	selectNewOffer: boolean;
	handleSelectNewOffer: (select: boolean) => void;
	handleGOToDashboard: () => void;
	insertRequirement: (requirements: RequirementProps) => void;
	requirementList: RequirementProps[];
	deleteRequirement: (label: string) => void;
	updateRequirement: (label: string, requirements: RequirementProps) => void;
	handleSelectNativeToken: (e: boolean) => void;
	handleCreateRaffle: () => void;
	isCreateRaffleModalOpen: boolean;
	createRaffleResponse: any | null;
	createRaffleLoading: boolean;
	handleSetCreateRaffleLoading: () => void;
	checkContractInfo: boolean;
	isContractAddressValid: boolean;
}>({
	page: 0,
	setPage: () => {},
	data: {
		...initData,
	},
	requirementModalItems: [...modalItems],
	title: {
		...title,
	},
	canSubmit: false,
	handleChange: () => {},
	handleSelectTokenOrNft: () => {},
	handleSelectLimitEnrollPeopleCheck: () => {},
	closeRequirementModal: () => {},
	closeCreateRaffleModal: () => {},
	openRequirementModal: () => {},
	openCreteRaffleModal: () => {},
	handleSelectRequirementModal: () => {},
	isModalOpen: false,
	requirementTitle: null,
	handleBackToRequirementModal: () => {},
	chainList: [],
	selectedChain: null,
	setSelectedChain: () => {},
	chainName: '',
	handleSearchChain: () => {},
	setChainName: () => {},
	filterChainList: [],
	setSearchPhrase: () => {},
	handleSelectChain: () => {},
	handleSelectSatisfy: () => {},
	allowListPrivate: false,
	handleSelectAllowListPrivate: () => {},
	canGoStepTwo: () => false,
	canGoStepThree: () => {},
	canGoStepFive: () => false,
	setDuration: false,
	handleSetDuration: () => {},
	handleSetDurationManually: () => {},
	handleSelectDurationUnitTime: () => {},
	openShowPreviewModal: () => {},
	closeShowPreviewModal: () => {},
	selectNewOffer: false,
	handleSelectNewOffer: () => {},
	handleGOToDashboard: () => {},
	insertRequirement: () => {},
	requirementList: [],
	deleteRequirement: () => {},
	updateRequirement: () => {},
	handleSelectNativeToken: () => {},
	handleCreateRaffle: () => {},
	isCreateRaffleModalOpen: false,
	createRaffleResponse: null,
	createRaffleLoading: false,
	handleSetCreateRaffleLoading: () => {},
	checkContractInfo: false,
	isContractAddressValid: false,
});

export const PrizeOfferFormProvider = ({ children }: PropsWithChildren<{}>) => {
	const [requirementList, setRequirementList] = useState<RequirementProps[]>([]);
	const insertRequirement = (requirements: RequirementProps) => {
		setRequirementList([...requirementList, requirements]);
	};

	const [data, setData] = useState<ProviderDashboardFormDataProp>({
		...initData,
	});

	const { userProfile } = useContext(UserProfileContext);
	const { provider, account } = useWeb3React();

	const updateRequirement = (label: string, requirements: RequirementProps) => {
		const newItem = requirementList.map((item) => {
			if (item.type == label) {
				return { ...requirements };
			}
			return item;
		});

		setRequirementList(newItem);
	};

	const deleteRequirement = (label: string) => {
		setRequirementList((prev) => prev.filter((item) => item.type != label));
	};

	const [selectNewOffer, setSelectNewOffer] = useState<boolean>(false);

	const handleSelectNewOffer = (select: boolean) => {
		setSelectNewOffer(select);
	};

	const [setDuration, setSetDuration] = useState<boolean>(false);

	const handleSetDuration = (e: boolean) => {
		setSetDuration(e);
	};

	const isAddressValid = (tokenContractAddress: string) => {
		try {
			return !!isAddress(tokenContractAddress);
		} catch {
			return false;
		}
	};

	const isValidContractAddress = async (tokenContractAddress: string) => {
		try {
			const res = await provider?.getCode(tokenContractAddress);
			return res != '0x';
		} catch {
			return false;
		}
	};

	const checkAddress = async () => {
		if (data.tokenContractAddress == ZERO_ADDRESS) {
			setIsContractAddressValid(true);
			setCheckContractInfo(false);
			return true;
		}
		const res = await isValidContractAddress(data.tokenContractAddress);
		console.log(res);
		setIsContractAddressValid(res);
		!res && setCheckContractInfo(false);
		res && provider && getTokenContract();
	};

	const [isContractAddressValid, setIsContractAddressValid] = useState<boolean>(false);

	useEffect(() => {
		setIsContractAddressValid(isAddressValid(data.tokenContractAddress));
		if (isAddressValid(data.tokenContractAddress)) {
			setCheckContractInfo(true);
			checkAddress();
		} else {
			setCheckContractInfo(false);
		}
	}, [data.tokenContractAddress]);

	const canGoStepTwo = () => {
		console.log('canGoStepTwo');
		const {
			provider,
			description,
			selectedChain,
			tokenAmount,
			nftContractAddress,
			isNativeToken,
			tokenContractAddress,
			nftTokenId,
		} = data;

		const checkToken = () => {
			if (!data.isNft) {
				const isValid = tokenContractAddress == ZERO_ADDRESS ? true : isAddressValid(tokenContractAddress);
				if (!isValid || !tokenAmount || !isContractAddressValid) return false;
				if (!isNativeToken && !tokenContractAddress) return false;
				if (isNativeToken && tokenAmount && tokenContractAddress) return true;
			}
			return true;
		};

		const checkNft = () => {
			if (data.isNft) {
				return !!(nftContractAddress && nftTokenId);
			}
			return true;
		};

		return !!(provider && description && selectedChain && checkNft() && checkToken());
	};

	const canGoStepThree = () => {
		const errorObject: ErrorObjectProp = {
			startDateStatus: true,
			statDateStatusMessage: null,
			endDateStatus: true,
			endDateStatusMessage: null,
			numberOfDurationStatus: true,
			numberOfDurationMessage: null,
			maximumLimitationStatus: true,
			maximumLimitationMessage: null,
		};

		const { startTime, endTime } = data;

		if (startTime) {
			if (!checkRegexDateValidation(startTime)) {
				errorObject.startDateStatus = false;
				errorObject.statDateStatusMessage = errorMessages.invalidFormat;
			} else {
				if (!checkStartDate(startTime)) {
					errorObject.startDateStatus = false;
					errorObject.statDateStatusMessage = errorMessages.startTimeDuration;
				}
			}
		} else {
			errorObject.startDateStatus = false;
			errorObject.statDateStatusMessage = errorMessages.required;
		}

		if (!setDuration && !endTime) {
			errorObject.endDateStatus = false;
			errorObject.endDateStatusMessage = errorMessages.required;
		}
		if (setDuration && !data.numberOfDuration) {
			errorObject.numberOfDurationStatus = false;
			errorObject.numberOfDurationMessage = errorMessages.required;
		}

		if (!setDuration && endTime) {
			if (!checkRegexDateValidation(endTime)) {
				errorObject.endDateStatus = false;
				errorObject.endDateStatusMessage = errorMessages.invalidFormat;
			}
			if (!!errorObject.endDateStatusMessage && startTime) {
				if (!checkEndDate(endTime, startTime)) {
					errorObject.endDateStatus = false;
					errorObject.endDateStatusMessage = errorMessages.endDateUnacceptable;
				}
			}
		}
		if (data.limitEnrollPeopleCheck && !data.maximumNumberEnroll) {
			errorObject.maximumLimitationStatus = false;
			errorObject.maximumLimitationMessage = errorMessages.required;
		}

		endTime &&
			startTime &&
			setData({
				...data,
				endTimeStamp: String(convertStringToDate(endTime).getTime() / 1000),
				startTimeStamp: String(convertStringToDate(startTime).getTime() / 1000),
			});

		return errorObject;
	};

	const canGoStepFive = () => {
		return true;
		const { email } = data;
		return !!email;
	};

	const [checkContractInfo, setCheckContractInfo] = useState<boolean>(false);

	const getTokenContract = async () => {
		if (provider && account) {
			const erc20Contract = getContract(data.tokenContractAddress, Erc20_ABI, provider);

			if (erc20Contract) {
				Promise.all([
					erc20Contract.name(),
					erc20Contract.symbol(),
					erc20Contract.decimals(),
					erc20Contract.balanceOf(account),
				]).then(([r1, r2, r3, r4]) => {
					console.log(r1, r2, r3, r4);
					setData({
						...data,
						tokenName: r1,
						tokenDecimals: r2,
						tokenSymbol: r3,
						userTokenBalance: r4?.toString(),
					});
					setCheckContractInfo(false);
				});
			}
		}
	};

	const [searchPhrase, setSearchPhrase] = useState<string>('');

	const [selectedChain, setSelectedChain] = useState<Chain | null>(null);

	const [chainName, setChainName] = useState<string>('');

	const [page, setPage] = useState<number>(0);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [isCreateRaffleModalOpen, setIsCreateRaffleModalOpen] = useState<boolean>(false);

	const [chainList, setChainList] = useState<Chain[]>([]);

	const [allowListPrivate, setAllowListPrivate] = useState<boolean>(false);

	const [createRaffleResponse, setCreteRaffleResponse] = useState<any | null>(null);
	const [createRaffleLoading, setCreateRaffleLoading] = useState<boolean>(false);

	const { callback } = useUnitapProviderDashboardCallback(
		data.tokenAmount,
		data.tokenContractAddress,
		data.maximumNumberEnroll ? data.maximumNumberEnroll : '1000000000000000000',
		1,
		data.startTimeStamp,
		data.endTimeStamp,
		data.isNft,
		data.nftContractAddress ? data.nftContractAddress : ZERO_ADDRESS,
		data.nftTokenId ? String(data.nftTokenId) : '1',
	);

	const handleSelectNativeToken = (e: boolean) => {
		setData({ ...data, isNativeToken: !e, tokenContractAddress: !e ? ZERO_ADDRESS : '', decimal: !e ? 18 : null });
	};

	const filterChainList = useMemo(() => {
		return chainList.filter((chain) => chain.chainName.toLocaleLowerCase().includes(searchPhrase.toLocaleLowerCase()));
	}, [chainName]);

	const handleSelectDurationUnitTime = (unit: string) => {
		setData((prevData) => ({
			...prevData,
			['durationUnitTime']: unit,
		}));
	};

	const handleSelectAllowListPrivate = () => {
		setAllowListPrivate(!allowListPrivate);
	};

	const handleSetDurationManually = () => {
		setData((prevData) => ({
			...prevData,
			['setDuration']: !data.setDuration,
		}));
	};

	const [requirementModalItems, setRequirementModalItems] = useState<ModalItemProps[]>(modalItems);

	const [requirementTitle, setRequirementTitle] = useState<string | null>(null);

	const handleSelectTokenOrNft = (e: boolean) => {
		setData((prevData) => ({
			...prevData,
			['isNft']: e,
		}));
	};

	const updateChainList = useCallback(async () => {
		try {
			const newChainList = await getChainList();
			setChainList(newChainList);
		} catch (e) {}
	}, []);

	const handleSearchChain = (e: { target: { value: SetStateAction<string> } }) => {
		setChainName(e.target.value);
		setSearchPhrase(e.target.value);
	};

	const handleSelectChain = (chain: Chain) => {
		setSelectedChain(chain);
		setChainName(chain.chainName);
		setSearchPhrase('');
	};

	const handleSelectSatisfy = (satisfy: string) => {
		setData((prevData) => ({
			...prevData,
			['satisfy']: satisfy,
		}));
	};

	useEffect(() => {
		if (selectedChain) {
			setChainName(selectedChain?.chainName);
			setData((prevData) => ({
				...prevData,
				['selectedChain']: selectedChain,
			}));
		}
	}, [selectedChain]);

	useEffect(() => {
		updateChainList();
	}, [updateChainList]);

	const handleSelectLimitEnrollPeopleCheck = () => {
		setData((prevData) => ({
			...prevData,
			limitEnrollPeopleCheck: !data.limitEnrollPeopleCheck,
			maximumNumberEnroll: '',
		}));
	};

	const handleChange = (e: { target: { type: any; name: any; checked: any; value: any } }) => {
		const type = e.target.type;
		const name = e.target.name;
		const value = type == 'checkbox' ? e.target.checked : e.target.value;
		if (name == 'provider' && value.length > 30) return;
		if (name == 'description' && value.length > 100) return;
		if (name == 'necessaryInfo' && value.length > 100) return;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSelectRequirementModal = (title: string) => {
		setRequirementTitle(title);
		const newItem = modalItems.map((item) => {
			if (item.label == title) {
				return { ...item, isOpen: true };
			}
			return item;
		});
		setRequirementModalItems(newItem);
	};

	const handleBackToRequirementModal = () => {
		setRequirementModalItems([...modalItems]);
		setRequirementTitle(null);
	};

	const { ...requiredInputs } = data;

	const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1;

	const closeRequirementModal = () => {
		setRequirementModalItems([...modalItems]);
		setRequirementTitle(null);
		setIsModalOpen(false);
	};

	const closeCreateRaffleModal = () => {
		setIsCreateRaffleModalOpen(false);
	};

	const openCreteRaffleModal = () => {
		setIsCreateRaffleModalOpen(true);
	};

	const openRequirementModal = () => {
		setIsModalOpen(true);
	};

	const closeShowPreviewModal = () => {
		setIsModalOpen(false);
	};

	const openShowPreviewModal = () => {
		setIsModalOpen(true);
	};

	const handleGOToDashboard = () => {
		setSelectNewOffer(false);
		setPage(0);
		setData(initData);
		setChainName('');
		setSelectedChain(null);
		setCreteRaffleResponse(null);
	};

	const createRaffleWithMetamask = useCallback(async () => {
		if (!userProfile || !provider || !useUnitapProviderDashboardCallback) return;

		try {
			setCreateRaffleLoading(true);
			const response = await callback?.();
			if (response) {
				response
					.wait()
					.then((res) => {
						console.log(res);
						setCreteRaffleResponse({
							success: true,
							state: 'Done',
							txHash: res.transactionHash,
							message: 'Created raffle successfully.',
						});
						setCreateRaffleLoading(false);
					})
					.catch(() => {
						setCreteRaffleResponse({
							success: false,
							state: 'Retry',
							message: 'Something went wrong. Please try again!',
						});
						setCreateRaffleLoading(false);
					});
			}
		} catch (e: any) {
			console.log(e);
			setCreteRaffleResponse({
				success: false,
				state: 'Retry',
				message: 'Something went wrong. Please try again!',
			});
			setCreateRaffleLoading(false);
		}
	}, [userProfile, provider, callback]);

	const handleSetCreateRaffleLoading = () => {
		setCreateRaffleLoading(true);
	};

	const handleCreateRaffle = useCallback(async () => {
		if (createRaffleLoading) return;
		createRaffleWithMetamask();
	}, [createRaffleLoading, createRaffleWithMetamask]);

	return (
		<PrizeOfferFormContext.Provider
			value={{
				page,
				setPage,
				data,
				title,
				canSubmit,
				handleChange,
				handleSelectTokenOrNft,
				handleSelectLimitEnrollPeopleCheck,
				openRequirementModal,
				closeRequirementModal,
				isModalOpen,
				requirementModalItems,
				handleSelectRequirementModal,
				requirementTitle,
				handleBackToRequirementModal,
				chainList,
				selectedChain,
				setSelectedChain,
				chainName,
				handleSearchChain,
				setChainName,
				filterChainList,
				setSearchPhrase,
				handleSelectChain,
				handleSelectSatisfy,
				allowListPrivate,
				handleSelectAllowListPrivate,
				canGoStepTwo,
				canGoStepThree,
				canGoStepFive,
				setDuration,
				handleSetDuration,
				handleSetDurationManually,
				handleSelectDurationUnitTime,
				closeShowPreviewModal,
				openShowPreviewModal,
				selectNewOffer,
				handleSelectNewOffer,
				handleGOToDashboard,
				insertRequirement,
				requirementList,
				deleteRequirement,
				updateRequirement,
				handleSelectNativeToken,
				handleCreateRaffle,
				closeCreateRaffleModal,
				isCreateRaffleModalOpen,
				openCreteRaffleModal,
				createRaffleResponse,
				createRaffleLoading,
				handleSetCreateRaffleLoading,
				checkContractInfo,
				isContractAddressValid,
			}}
		>
			{children}
		</PrizeOfferFormContext.Provider>
	);
};

export default PrizeOfferFormContext;
