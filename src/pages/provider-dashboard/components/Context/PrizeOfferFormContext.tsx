import {
	createRaffleApi,
	getConstraintsApi,
	getProviderDashboardValidChain,
	getUserRaffles,
	updateCreateRaffleTx,
} from 'api';
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
import { ZERO_ADDRESS } from 'constants/addresses';
import { getContract, isAddress } from 'utils';
import Erc20_ABI from '../../../../abis/Erc20.json';
import Erc721_ABI from '../../../../abis/Erc721.json';
import {
	approveErc20TokenCallback,
	approveErc721TokenCallback,
	createErc20RaffleCallback,
	createErc721RaffleCallback,
} from 'hooks/providerDashboard/providerCreateRaffle';
import { useTransactionAdder } from 'state/transactions/hooks';
import PrizeTap_ABI from '../../../../abis/UnitapPrizeTap.json';
import PrizeTap721_ABI from '../../../../abis/UnitapPrizeTap721.json';
import { fromWei, toWei } from 'utils/numbers';
import { BigNumberish } from 'ethers';

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
	isOwnerOfNft: boolean;
	handleSetDate: (timeStamp: number, label: string) => void;
	handleApproveToken: () => void;
	isErc20Approved: boolean;
	isNftApproved: boolean;
	approveLoading: boolean;
	constraintsList: any;
	handleApproveErc721Token: () => void;
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
	isOwnerOfNft: false,
	handleSetDate: () => {},
	handleApproveToken: () => {},
	isErc20Approved: false,
	approveLoading: false,
	constraintsList: [],
	isNftApproved: false,
	handleApproveErc721Token: () => {},
});

export const PrizeOfferFormProvider = ({ children }: PropsWithChildren<{}>) => {
	const [requirementList, setRequirementList] = useState<RequirementProps[]>([]);
	const insertRequirement = (requirements: RequirementProps) => {
		setRequirementList([...requirementList, requirements]);
	};

	const [data, setData] = useState<ProviderDashboardFormDataProp>({
		...initData,
	});

	const { userToken } = useContext(UserProfileContext);

	const addTransaction = useTransactionAdder();

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
		console.log(e);
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
			setIsContractAddressValid(true);
			setCheckContractInfo(false);
			return true;
		}
		const res = await isValidContractAddress(data.isNft ? data.nftContractAddress : data.tokenContractAddress);
		setIsContractAddressValid(res);
		!res && setCheckContractInfo(false);
		!data.isNft && res && provider ? getErc20TokenContract() : getErc721NftContract();
	};

	const [isContractAddressValid, setIsContractAddressValid] = useState<boolean>(false);

	useEffect(() => {
		setIsContractAddressValid(isAddressValid(data.tokenContractAddress));
		if (isAddressValid(data.tokenContractAddress) && data.tokenAmount) {
			setCheckContractInfo(true);
			checkAddress();
		} else {
			setCheckContractInfo(false);
		}
	}, [data.tokenContractAddress, data.tokenAmount]);

	useEffect(() => {
		setIsNftApproved(false);
		setIsContractAddressValid(isAddressValid(data.nftContractAddress));
		if (isAddressValid(data.nftContractAddress) && data.nftTokenId) {
			setCheckContractInfo(true);
			checkAddress();
		} else {
			setCheckContractInfo(false);
		}
	}, [data.nftContractAddress, data.nftTokenId]);

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
				if (!isValid || !tokenAmount || !isContractAddressValid) return false;
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

	const handleSetDate = (timeStamp: number, label: string) => {
		label == 'startTime'
			? setData((prevData) => ({ ...prevData, startTimeStamp: timeStamp }))
			: setData((prevData) => ({ ...prevData, endTimeStamp: timeStamp }));
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
			// const sevenDaysAfterStartTime = data.startTimeStamp + 7 * 24 * 60 * 60;
			if (endTimeStamp < startTimeStamp) {
				errorObject.endDateStatus = false;
				errorObject.endDateStatusMessage = errorMessages.endLessThanStart;
			}
			// if (endTimeStamp < sevenDaysAfterStartTime && endTimeStamp > startTimeStamp) {
			// 	errorObject.endDateStatus = false;
			// 	errorObject.endDateStatusMessage = errorMessages.period;
			// }
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
		console.log(data);
		return true;
		const { email } = data;
		return !!email;
	};

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

	const getErc20TokenContract = async () => {
		if (provider && account) {
			const erc20Contract = getContract(data.tokenContractAddress, Erc20_ABI, provider);
			try {
				await erc20Contract.decimals();
			} catch (e) {
				setCheckContractInfo(false);
				setIsContractAddressValid(false);
				return;
			}
			if (erc20Contract) {
				Promise.all([
					erc20Contract.name(),
					erc20Contract.symbol(),
					erc20Contract.decimals(),
					erc20Contract.balanceOf(account),
					erc20Contract.allowance(account, data.selectedChain.erc20PrizetapAddr),
				]).then(([r1, r2, r3, r4, r5]) => {
					setData((prevData) => ({
						...prevData,
						tokenName: r1,
						tokenSymbol: r2,
						tokenDecimals: r3,
						userTokenBalance: r4?.toString(),
					}));
					setIsErc20Approved(
						Number(fromWei(r5.toString(), r3)) != 0 &&
							Number(fromWei(r5.toLocaleString(), r3)) >= Number(data.tokenAmount),
					);
					setCheckContractInfo(false);
				});
			}
		}
	};

	const [isNftApproved, setIsNftApproved] = useState<boolean>(false);
	const getErc721NftContract = async () => {
		if (provider && account && data.nftTokenId && data.nftContractAddress) {
			const erc721Contract = getContract(data.nftContractAddress, Erc721_ABI, provider);
			try {
				const ownerOf = await erc721Contract.ownerOf(data.nftTokenId);
				if (ownerOf.toLocaleLowerCase() !== account.toLocaleLowerCase()) {
					setIsOwnerOfNft(false);
					setCheckContractInfo(false);
					return;
				}
			} catch {
				setIsOwnerOfNft(false);
				setCheckContractInfo(false);
				setIsContractAddressValid(false);
				return;
			}
			setIsOwnerOfNft(true);
			if (erc721Contract) {
				Promise.all([
					erc721Contract.name(),
					erc721Contract.symbol(),
					erc721Contract.balanceOf(account),
					erc721Contract.tokenURI(data.nftTokenId),
					erc721Contract.getApproved(data.nftTokenId),
				]).then(([r1, r2, r3, r4, r5]) => {
					setIsNftApproved(r5.toLocaleLowerCase() == data.selectedChain.erc721PrizetapAddr.toLocaleLowerCase());
					setData((prevData) => ({
						...prevData,
						nftName: r1,
						nftSymbol: r2,
						userNftBalance: r3?.toString(),
						nftTokenUri: r4,
					}));
					setCheckContractInfo(false);
				});
			}
		}
	};

	const handleSelectNativeToken = (e: boolean) => {
		if (!data.selectedChain) return;
		setIsErc20Approved(true);
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

	const [requirementModalItems, setRequirementModalItems] = useState<ModalItemProps[]>(modalItems);

	const [requirementTitle, setRequirementTitle] = useState<string | null>(null);

	const [userRaffle, setUserRaffles] = useState([]);

	const handleSelectTokenOrNft = (e: boolean) => {
		if (!data.selectedChain) return;
		setData((prevData) => ({
			...prevData,
			['isNft']: e,
		}));
	};

	const handleGetUserRaffles = useCallback(async () => {
		if (!userToken) return;
		try {
			const raffles = await getUserRaffles(userToken);
			setUserRaffles(raffles);
		} catch (e) {
			console.log(e);
		}
	}, []);

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

	const [constraintsList, setConstraintsList] = useState([]);
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
		const res = await getConstraintsApi();
		setConstraintsList(res);
	};

	useEffect(() => {
		updateChainList();
		handleGetUserRaffles();
		handleGetConstraints();
	}, [updateChainList, handleGetUserRaffles]);

	const handleSelectLimitEnrollPeopleCheck = () => {
		setData((prevData) => ({
			...prevData,
			limitEnrollPeopleCheck: !data.limitEnrollPeopleCheck,
			maximumNumberEnroll: null,
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

	const [approveLoading, setApproveLoading] = useState<boolean>(false);

	const handleApproveToken = useCallback(async () => {
		if (provider && account) {
			const erc20Contract: any = getContract(data.tokenContractAddress, Erc20_ABI, provider);
			try {
				setApproveLoading(true);
				const response = await approveErc20TokenCallback(
					account,
					erc20Contract,
					data.selectedChain.erc20PrizetapAddr,
					data.tokenContractAddress,
					provider,
					data.tokenAmount,
					data.tokenDecimals,
					addTransaction,
				);

				if (response) {
					response
						.wait()
						.then((res) => {
							setApproveLoading(false);
							setIsErc20Approved(true);
						})
						.catch(() => {
							setApproveLoading(false);
						});
				}
			} catch (e: any) {
				console.log(e);
				setApproveLoading(false);
			}
		}
	}, [userProfile, provider, addTransaction, data]);

	const handleApproveErc721Token = useCallback(async () => {
		if (provider && account) {
			const erc721Contract: any = getContract(data.nftContractAddress, Erc721_ABI, provider);
			try {
				setApproveLoading(true);
				const response = await approveErc721TokenCallback(
					account,
					erc721Contract,
					data.selectedChain.erc721PrizetapAddr,
					data.nftContractAddress,
					provider,
					data.nftTokenId,
					addTransaction,
				);

				if (response) {
					response
						.wait()
						.then((res) => {
							setApproveLoading(false);
							setIsNftApproved(true);
						})
						.catch(() => {
							setApproveLoading(false);
						});
				}
			} catch (e: any) {
				console.log(e);
				setApproveLoading(false);
			}
		}
	}, [userProfile, provider, addTransaction, data]);

	const createRaffleErc20WithMetamask = useCallback(async () => {
		if (!userProfile || !provider || !account || !userToken) return;
		const raffleContractAddress = data.selectedChain?.erc20PrizetapAddr;
		const maximumNumberEnroll = data.maximumNumberEnroll ? data.maximumNumberEnroll : '1000000000';
		const prizeName = data.isNativeToken
			? data.tokenAmount + ' ' + data.selectedChain.symbol
			: data.tokenAmount + ' ' + data.tokenSymbol;

		const prizeSymbol = data.isNativeToken ? data.selectedChain.symbol : data.tokenSymbol;

		const decimals = data.isNativeToken ? 18 : data.tokenDecimals;
		const prizeAmount = toWei(data.tokenAmount, data.isNativeToken ? 18 : data.tokenDecimals);
		const startAt =
			new Date(data.startTimeStamp * 1000).getFullYear() +
			'-' +
			(Number(new Date(data.startTimeStamp * 1000).getMonth()) + 1) +
			'-' +
			new Date(data.startTimeStamp * 1000).getDate() +
			' ' +
			new Date(data.startTimeStamp * 1000).getHours() +
			':' +
			new Date(data.startTimeStamp * 1000).getMinutes();
		const deadline =
			new Date(data.endTimeStamp * 1000).getFullYear() +
			'-' +
			(Number(new Date(data.endTimeStamp * 1000).getMonth()) + 1) +
			'-' +
			new Date(data.endTimeStamp * 1000).getDate() +
			' ' +
			new Date(data.endTimeStamp * 1000).getHours() +
			':' +
			new Date(data.endTimeStamp * 1000).getMinutes();

		const raffleData = {
			name: data.provider,
			description: data.description,
			contract: raffleContractAddress,
			creator_name: 'abbas test',
			creator_address: account,
			prize_amount: prizeAmount,
			prize_asset: data.tokenContractAddress,
			prize_name: prizeName,
			prize_symbol: prizeSymbol,
			decimals: decimals,
			chain: Number(data.selectedChain.chainId),
			constraint_params: [],
			deadline: deadline,
			max_number_of_entries: maximumNumberEnroll,
			start_at: startAt,
		};

		const rafflePk = await createRaffleApi(userToken, raffleData);
		console.log(rafflePk);
		const raffleContract: any = getContract(raffleContractAddress, PrizeTap_ABI, provider);

		try {
			setCreateRaffleLoading(true);

			const response = await createErc20RaffleCallback(
				account,
				raffleContract,
				provider,
				data.tokenAmount,
				data.tokenDecimals,
				addTransaction,
				data.tokenContractAddress,
				maximumNumberEnroll,
				data.startTimeStamp,
				data.endTimeStamp,
				data.isNativeToken,
			);

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
						// updateCreateRaffleTx(userToken, rafflePk, res.transactionHash, )
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
	}, [userProfile, provider, addTransaction, data, userToken]);

	const createRaffleErc721WithMetamask = useCallback(async () => {
		if (!userProfile || !provider || !account) return;
		const raffleContractAddress = data.selectedChain?.erc721PrizetapAddr;
		console.log(raffleContractAddress);
		const maximumNumberEnroll = data.maximumNumberEnroll ? data.maximumNumberEnroll : '1000000000';

		const raffleContract: any = getContract(raffleContractAddress, PrizeTap721_ABI, provider);

		try {
			setCreateRaffleLoading(true);

			console.log(
				account,
				raffleContract,
				data.nftContractAddress,
				data.nftTokenId,
				maximumNumberEnroll,
				data.startTimeStamp,
				data.endTimeStamp,
			);

			const response = await createErc721RaffleCallback(
				account,
				provider,
				raffleContract,
				data.nftContractAddress,
				data.nftTokenId,
				maximumNumberEnroll,
				data.startTimeStamp,
				data.endTimeStamp,
				addTransaction,
			);

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
	}, [userProfile, provider, addTransaction, data]);

	const handleSetCreateRaffleLoading = () => {
		setCreateRaffleLoading(true);
	};

	const handleCreateRaffle = useCallback(async () => {
		if (!data.isNft) {
			createRaffleErc20WithMetamask();
		} else {
			createRaffleErc721WithMetamask();
		}
	}, [createRaffleLoading, createRaffleErc20WithMetamask]);

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
				isOwnerOfNft,
				handleSetDate,
				handleApproveToken,
				isErc20Approved,
				approveLoading,
				constraintsList,
				isNftApproved,
				handleApproveErc721Token,
			}}
		>
			{children}
		</PrizeOfferFormContext.Provider>
	);
};

export default PrizeOfferFormContext;
