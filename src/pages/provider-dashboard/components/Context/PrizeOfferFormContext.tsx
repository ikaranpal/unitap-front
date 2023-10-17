import { getConstraintsApi, getProviderDashboardValidChain, getUserRaffles } from 'api';
import {
	createContext,
	useState,
	useEffect,
	PropsWithChildren,
	useCallback,
	SetStateAction,
	useMemo,
	useContext,
	useRef,
} from 'react';
import { Chain, ProviderDashboardFormDataProp, ConstraintProps, ConstraintParamValues, UserRafflesProps } from 'types';
import { UserProfileContext } from 'hooks/useUserProfile';
import { useWeb3React } from '@web3-react/core';
import { ZERO_ADDRESS } from 'constants/addresses';
import { isAddress } from 'utils';
import { useTransactionAdder } from 'state/transactions/hooks';
import { getErc20TokenContract } from 'pages/provider-dashboard/utils/getErc20TokenContract';
import { getErc721NftContract } from 'pages/provider-dashboard/utils/getErc721NftContract';
import { approveErc20Token } from 'pages/provider-dashboard/utils/approveErc20Token';
import { approveErc721Token } from 'pages/provider-dashboard/utils/approveErc721Token';
import { createErc20Raffle } from 'pages/provider-dashboard/utils/createErc20Raffle';
import { createErc721Raffle } from 'pages/provider-dashboard/utils/createErc721Raffle';
import { RefreshContext } from 'context/RefreshContext';

const initData: ProviderDashboardFormDataProp = {
	provider: '',
	description: '',
	isNft: false,
	isNativeToken: false,
	tokenAmount: '',
	tokenContractAddress: '',
	nftContractAddress: '',
	nftTokenId: 0,
	selectedChain: null,
	startTimeStamp: null,
	endTimeStamp: null,
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
	nftName: null,
	nftSymbol: null,
	userNftBalance: undefined,
	nftTokenUri: null,
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
	startTimeDuration: 'The start time must be at least 7 days after now.',
	endDateUnacceptable: 'End date is unacceptable.',
	period: 'The minimum period is one week.',
	endLessThanStart: 'The end time cannot be less than the start time.',
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
	selectedConstrains: ConstraintProps | null;
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
	handleSelectConstraint: (constraint: ConstraintProps) => void;
	isModalOpen: boolean;
	selectedConstraintTitle: string | null;
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
	handleSelectDurationUnitTime: (unit: string) => void;
	selectNewOffer: boolean;
	handleSelectNewOffer: (select: boolean) => void;
	handleGOToDashboard: () => void;
	insertRequirement: (requirement: ConstraintParamValues | null, id: number, name: string) => void;
	requirementList: ConstraintParamValues[];
	deleteRequirement: (id: number) => void;
	updateRequirement: (id: number, requirements: ConstraintParamValues | null) => void;
	handleSelectNativeToken: (e: boolean) => void;
	handleCreateRaffle: () => void;
	isCreateRaffleModalOpen: boolean;
	createRaffleResponse: any | null;
	createRaffleLoading: boolean;
	handleSetCreateRaffleLoading: () => void;
	checkContractInfo: boolean;
	isTokenContractAddressValid: boolean;
	isNftContractAddressValid: boolean;
	isOwnerOfNft: boolean;
	handleSetDate: (timeStamp: number, label: string) => void;
	handleApproveErc20Token: () => void;
	isErc20Approved: boolean;
	isNftApproved: boolean;
	approveLoading: boolean;
	constraintsList: ConstraintProps[];
	handleApproveErc721Token: () => void;
	canDisplayErrors: boolean;
	userRaffles: UserRafflesProps[];
	userRafflesLoading: boolean;
	handleGetConstraints: () => void;
	updateChainList: () => void;
	canDisplayWrongAddress: boolean;
}>({
	page: 0,
	setPage: () => {},
	data: {
		...initData,
	},
	selectedConstrains: null,
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
	handleSelectConstraint: () => {},
	isModalOpen: false,
	selectedConstraintTitle: null,
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
	isTokenContractAddressValid: false,
	isNftContractAddressValid: false,
	isOwnerOfNft: false,
	handleSetDate: () => {},
	handleApproveErc20Token: () => {},
	isErc20Approved: false,
	approveLoading: false,
	constraintsList: [],
	isNftApproved: false,
	handleApproveErc721Token: () => {},
	canDisplayErrors: false,
	userRaffles: [],
	userRafflesLoading: false,
	handleGetConstraints: () => {},
	updateChainList: () => {},
	canDisplayWrongAddress: false,
});

export const PrizeOfferFormProvider = ({ children }: PropsWithChildren<{}>) => {
	const { fastRefresh } = useContext(RefreshContext);

	const insertRequirement = (requirement: ConstraintParamValues | null, id: number, name: string) => {
		setRequirementList([
			...requirementList,
			{ pk: id, values: !requirement ? null : { 1: 'test', 2: 'name', 3: 'lastName' }, name },
		]);
	};

	const [data, setData] = useState<ProviderDashboardFormDataProp>({
		...initData,
	});

	const { userToken } = useContext(UserProfileContext);

	const addTransaction = useTransactionAdder();

	const { provider, account, chainId } = useWeb3React();

	const updateRequirement = (id: number, requirements: ConstraintParamValues | null) => {
		if (!requirements) return;
		const newItem = requirementList.map((item) => {
			if (item.pk == id) {
				return { ...requirements };
			}
			return item;
		});

		setRequirementList(newItem);
	};

	const deleteRequirement = (id: number) => {
		setRequirementList((prev) => prev.filter((item) => item.pk != id));
	};

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
		if (!data.isNft && data.tokenContractAddress == ZERO_ADDRESS) {
			setIsTokenContractAddressValid(true);
			// setIsNftContractAddressValid(true);
			// setCanDisplayWrongAddress(false);
			setCheckContractInfo(false);
			return true;
		}
		const res = await isValidContractAddress(data.isNft ? data.nftContractAddress : data.tokenContractAddress);
		data.isNft ? setIsNftContractAddressValid(res) : setIsTokenContractAddressValid(res);
		setCanDisplayWrongAddress(!res);
		!res && setCheckContractInfo(false);
		if (!data.isNft && res && provider && account) {
			getErc20TokenContract(
				data,
				account,
				provider,
				setCheckContractInfo,
				setIsTokenContractAddressValid,
				setData,
				setIsErc20Approved,
			);
		}

		if (data.isNft && res && provider && account) {
			getErc721NftContract(
				data,
				account,
				provider,
				setCheckContractInfo,
				setIsTokenContractAddressValid,
				setData,
				setIsOwnerOfNft,
				setIsNftApproved,
			);
		}
	};

	useEffect(() => {
		setIsTokenContractAddressValid(isAddressValid(data.tokenContractAddress));
		setCanDisplayWrongAddress(!isAddressValid(data.tokenContractAddress));
		setCanDisplayErrors(false);
		if (Number(data.tokenAmount) <= 0) return;
		const handler = setTimeout(() => {
			if (isAddressValid(data.tokenContractAddress) && data.tokenAmount) {
				setCheckContractInfo(true);
				setCanDisplayErrors(true);
				checkAddress();
			} else {
				setCheckContractInfo(false);
			}
		}, 1000);

		return () => clearTimeout(handler);
	}, [data.tokenContractAddress, data.tokenAmount, chainId, account]);

	useEffect(() => {
		setCanDisplayErrors(false);
		setIsNftApproved(false);
		setIsNftContractAddressValid(isAddressValid(data.nftContractAddress));
		setCanDisplayWrongAddress(!isAddressValid(data.nftContractAddress));
		const handler = setTimeout(() => {
			if (isAddressValid(data.nftContractAddress) && data.nftTokenId) {
				setCheckContractInfo(true);
				setCanDisplayErrors(true);
				checkAddress();
			} else {
				setCheckContractInfo(false);
			}
		}, 1000);
		return () => clearTimeout(handler);
	}, [data.nftContractAddress, data.nftTokenId, chainId, account]);

	const handleSetDate = (timeStamp: number, label: string) => {
		label == 'startTime'
			? setData((prevData) => ({ ...prevData, startTimeStamp: timeStamp }))
			: setData((prevData) => ({ ...prevData, endTimeStamp: timeStamp }));
	};

	const [requirementList, setRequirementList] = useState<ConstraintParamValues[]>([]);

	const [isTokenContractAddressValid, setIsTokenContractAddressValid] = useState<boolean>(false);
	const [isNftContractAddressValid, setIsNftContractAddressValid] = useState<boolean>(false);

	const [canDisplayErrors, setCanDisplayErrors] = useState<boolean>(false);

	const [selectNewOffer, setSelectNewOffer] = useState<boolean>(false);

	const [checkContractInfo, setCheckContractInfo] = useState<boolean>(false);

	const [isOwnerOfNft, setIsOwnerOfNft] = useState<boolean>(false);

	const [searchPhrase, setSearchPhrase] = useState<string>('');

	const [selectedChain, setSelectedChain] = useState<any | null>(null);

	const [chainName, setChainName] = useState<string>('');

	const [page, setPage] = useState<number>(0);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [isCreateRaffleModalOpen, setIsCreateRaffleModalOpen] = useState<boolean>(false);

	const [chainList, setChainList] = useState<Chain[]>([]);

	const [isErc20Approved, setIsErc20Approved] = useState<boolean>(false);

	const [allowListPrivate, setAllowListPrivate] = useState<boolean>(false);

	const [createRaffleResponse, setCreteRaffleResponse] = useState<any | null>(null);

	const [createRaffleLoading, setCreateRaffleLoading] = useState<boolean>(false);

	const [userRafflesLoading, setUserRafflesLoading] = useState<boolean>(false);

	const [isNftApproved, setIsNftApproved] = useState<boolean>(false);

	const [selectedConstrains, setSelectedConstrains] = useState<ConstraintProps | null>(null);

	const [selectedConstraintTitle, setSelectedConstraintTitle] = useState<string | null>(null);

	const [userRaffles, setUserRaffles] = useState<UserRafflesProps[]>([]);

	const [approveLoading, setApproveLoading] = useState<boolean>(false);

	const [canDisplayWrongAddress, setCanDisplayWrongAddress] = useState<boolean>(false);

	const canGoStepTwo = () => {
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
				if (!isValid || !tokenAmount || Number(tokenAmount) <= 0) return false;
				if (!isNativeToken && !tokenContractAddress) return false;
				if (isNativeToken && tokenAmount && tokenContractAddress) return true;
			}
			return true;
		};

		const checkNft = () => {
			if (data.isNft) {
				const isValid = isAddressValid(nftContractAddress);
				return !!(nftContractAddress && nftTokenId && isValid && isOwnerOfNft);
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

		const { startTimeStamp, endTimeStamp } = data;
		if (!startTimeStamp) {
			errorObject.startDateStatus = false;
			errorObject.statDateStatusMessage = errorMessages.required;
		}
		const sevenDaysLaterAfterNow: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		const sevenDaysLaterAfterNowTimeStamp = Math.round(sevenDaysLaterAfterNow.getTime() / 1000);

		if (startTimeStamp && startTimeStamp < sevenDaysLaterAfterNowTimeStamp) {
			errorObject.startDateStatus = false;
			errorObject.statDateStatusMessage = errorMessages.startTimeDuration;
		}
		if (!setDuration && !endTimeStamp) {
			errorObject.endDateStatus = false;
			errorObject.endDateStatusMessage = errorMessages.required;
		}

		if (!setDuration && endTimeStamp && startTimeStamp) {
			if (endTimeStamp <= startTimeStamp) {
				errorObject.endDateStatus = false;
				errorObject.endDateStatusMessage = errorMessages.endLessThanStart;
			}
		}

		if (setDuration && !data.numberOfDuration) {
			errorObject.numberOfDurationStatus = false;
			errorObject.numberOfDurationMessage = errorMessages.required;
		}

		if (data.limitEnrollPeopleCheck && !data.maximumNumberEnroll) {
			errorObject.maximumLimitationStatus = false;
			errorObject.maximumLimitationMessage = errorMessages.required;
		}

		if (data.maximumNumberEnroll && Number(data.maximumNumberEnroll) <= 0) {
			errorObject.maximumLimitationStatus = false;
			errorObject.maximumLimitationMessage = errorMessages.required;
		}

		return errorObject;
	};

	const canGoStepFive = () => {
		return true;
		const { email, creatorUrl } = data;
		return !!(email && creatorUrl);
	};

	const handleSelectNativeToken = (e: boolean) => {
		if (!data.selectedChain) return;
		setIsErc20Approved(!e);
		setData((prevData) => ({
			...prevData,
			isNativeToken: !e,
			tokenContractAddress: !e ? ZERO_ADDRESS : '',
			decimal: !e ? 18 : null,
		}));
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

	const handleSelectTokenOrNft = (e: boolean) => {
		if (!data.selectedChain) return;
		setData((prevData) => ({
			...prevData,
			['isNft']: e,
		}));
	};

	const refController: any = useRef();

	useEffect(() => {
		return () => refController.current?.abort();
	}, []);

	const handleGetUserRaffles = useCallback(async () => {
		if (!userToken) return;
		setUserRafflesLoading(true);
		refController.current = new AbortController();
		try {
			const raffles = await getUserRaffles(userToken, refController.current.signal);
			refController.current = null;
			setUserRaffles(raffles);
			setUserRafflesLoading(false);
		} catch (e: any) {
			if (e?.message !== 'canceled' || !e?.message) {
				console.log(e);
			}
			setUserRafflesLoading(false);
		}
	}, [userToken]);

	const updateChainList = useCallback(async () => {
		try {
			const newChainList = await getProviderDashboardValidChain();
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

	const [constraintsList, setConstraintsList] = useState<ConstraintProps[]>([]);

	useEffect(() => {
		if (selectedChain) {
			setChainName(selectedChain?.chainName);
			setData((prevData) => ({
				...prevData,
				['selectedChain']: selectedChain,
			}));
		}
	}, [selectedChain]);

	const handleGetConstraints = async () => {
		if (constraintsList.length != 0) return;
		const res = await getConstraintsApi();
		setConstraintsList(res);
	};

	useEffect(() => {
		updateChainList();
	}, []);

	useEffect2(() => {
		handleGetUserRaffles();
	}, [handleGetUserRaffles, fastRefresh]);

	const handleSelectLimitEnrollPeopleCheck = () => {
		setData((prevData) => ({
			...prevData,
			limitEnrollPeopleCheck: !data.limitEnrollPeopleCheck,
			maximumNumberEnroll: null,
		}));
	};

	const handleChange = (e: { target: { type: any; name: any; checked: any; value: any } }) => {
		setCanDisplayWrongAddress(false);
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

	useEffect(() => {
		let newEndTimeStamp: any;
		if (setDuration && data.startTimeStamp && data.numberOfDuration > 0) {
			if (data.durationUnitTime == 'Day') {
				newEndTimeStamp = data.startTimeStamp + data.numberOfDuration * 24 * 60 * 60;
			}
			if (data.durationUnitTime == 'Week') {
				newEndTimeStamp = data.startTimeStamp + data.numberOfDuration * 7 * 24 * 60 * 60;
			}
			if (data.durationUnitTime == 'Month') {
				const currentDate = new Date(data.startTimeStamp * 1000);

				newEndTimeStamp = Math.round(
					currentDate.setMonth(Number(currentDate.getMonth()) + Number(data.numberOfDuration)) / 1000,
				);
			}
		}
		if (newEndTimeStamp) {
			setData((prevData) => ({
				...prevData,
				['endTimeStamp']: newEndTimeStamp,
			}));
		}
	}, [setDuration, data.durationUnitTime, data.numberOfDuration, setData]);

	const handleSelectConstraint = (constraint: ConstraintProps) => {
		setSelectedConstraintTitle(constraint.title);
		setSelectedConstrains(constraint);
	};

	const handleBackToRequirementModal = () => {
		setSelectedConstrains(null);
		setSelectedConstraintTitle(null);
	};

	const { ...requiredInputs } = data;

	const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1;

	const closeRequirementModal = () => {
		setSelectedConstrains(null);
		setSelectedConstraintTitle(null);
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
		setRequirementList([]);
	};

	const handleApproveErc20Token = () => {
		if (provider && account) {
			approveErc20Token(data, provider, account, setApproveLoading, setIsErc20Approved, addTransaction);
		}
	};

	const handleApproveErc721Token = () => {
		if (provider && account) {
			approveErc721Token(data, provider, account, setApproveLoading, setIsNftApproved, addTransaction);
		}
	};

	const handleSetCreateRaffleLoading = () => {
		setCreateRaffleLoading(true);
	};

	const handleCreateRaffle = () => {
		if (!data.isNft && account && provider && userToken) {
			createErc20Raffle(
				data,
				provider,
				requirementList,
				account,
				userToken,
				setCreateRaffleLoading,
				setCreteRaffleResponse,
				addTransaction,
			);
		}
		if (data.isNft && account && provider && userToken) {
			createErc721Raffle(
				data,
				provider,
				requirementList,
				account,
				userToken,
				setCreateRaffleLoading,
				setCreteRaffleResponse,
				addTransaction,
			);
		}
	};

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
				selectedConstrains,
				handleSelectConstraint,
				selectedConstraintTitle,
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
				isTokenContractAddressValid,
				isNftContractAddressValid,
				isOwnerOfNft,
				handleSetDate,
				handleApproveErc20Token,
				isErc20Approved,
				approveLoading,
				constraintsList,
				isNftApproved,
				handleApproveErc721Token,
				canDisplayErrors,
				userRaffles,
				userRafflesLoading,
				handleGetConstraints,
				updateChainList,
				canDisplayWrongAddress,
			}}
		>
			{children}
		</PrizeOfferFormContext.Provider>
	);
};

export default PrizeOfferFormContext;

const useEffect2 = (callback: any, list: any) => {
	const ref = useRef(false);
	useEffect(() => {
		if (ref.current) return callback();
		ref.current = true;
	}, [...list]);
};

//luck
const useRunOnce = (callback: any) => {
	const ref = useRef(true);
	useEffect(() => {
		if (ref.current) return callback();
		ref.current = false;
	}, []);
};
