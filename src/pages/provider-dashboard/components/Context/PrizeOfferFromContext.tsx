import { getChainList } from 'api';
import { createContext, useState, useEffect, PropsWithChildren, useCallback, SetStateAction, useMemo } from 'react';
import { Chain } from 'types';

export interface DataProp {
	provider: string | null;
	description: string | null;
	isNft: boolean;
	selectedChain: Chain | null;
	startTime: string | null;
	endTime: string | null;
	limitEnrollPeopleCheck: boolean;
	maximumNumberEnroll: number | null;
	requirement: string;
	email: string | null;
	twitter: string | null;
	discord: string | null;
	telegram: string | null;
	necessaryInfo: string;
	satisfy: string;
	tokenRequirementMax: any;
	tokenRequirementMin: any;
	tokenAddress: string;
	allowListPrivate: boolean;
	setDuration: boolean;
	numberOfDuration: number;
	durationUnitTime: string;
	NftSatisfy: boolean;
}

interface NftRequirementProp {
	nftRequirementSatisfy: boolean | null;
	nftRequirementSelectedChain: Chain | null;
	nftRequirementNftAddress: string | null;
	nftRequirementMax: number | null;
	nftRequirementMin: number | null;
	nftRequirementCustomID: number | null;
}

interface RequirementModalItems {
	nft: boolean;
	brightId: boolean;
	token: boolean;
	allowList: boolean;
	walletActivity: boolean;
	contractQuery: boolean;
	captcha: boolean;
	learnTap: boolean;
	gasTap: boolean;
	discord: boolean;
	twitter: boolean;
	poap: boolean;
	github: boolean;
	mirror: boolean;
	opAttestation: boolean;
	lens: boolean;
}

interface SelectMethodRequirementNft {
	maximumAmount: number | null;
	minimumAmount: number | null;
	customId: number | null;
}

const PrizeOfferFormContext = createContext<{
	page: number;
	setPage: (page: number) => void;
	data: DataProp;
	requirementModalItems: RequirementModalItems;
	title: any;
	canSubmit: boolean;
	handleChange: (e: any) => void;
	handleSelectTokenOrNft: (e: boolean) => void;
	handleSelectLimitEnrollPeopleCheck: () => void;
	openRequirementModal: () => void;
	closeRequirementModal: () => void;
	openShowPreviewModal: () => void;
	closeShowPreviewModal: () => void;
	handleSelectRequirementModal: (e: string, title: string) => void;
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
	handleChangeNftReq: (value: number, logic: string) => void;
	allowListPrivate: boolean;
	handleSelectAllowListPrivate: () => void;
	canGoStepTwo: () => void;
	canGoStepThree: () => void;
	canGoStepFive: () => void;
	setDuration: boolean;
	handleSetDuration: (e: boolean) => void;
	handleSetDurationManually: () => void;
	handleSelectDurationUnitTime: (unit: string) => void;
	selectNewOffer: boolean;
	handleSelectNewOffer: (select: boolean) => void;
	handleGOToDashboard: () => void;
	nftRequirement: NftRequirementProp | null;
	handleAddRequirementNft: (requirement: NftRequirementProp) => void;
}>({
	page: 0,
	setPage: () => {},
	data: {
		provider: null,
		description: null,
		isNft: false,
		selectedChain: null,
		startTime: null,
		endTime: null,
		limitEnrollPeopleCheck: false,
		maximumNumberEnroll: null,
		requirement: '',
		email: null,
		twitter: null,
		discord: null,
		telegram: null,
		necessaryInfo: '',
		satisfy: 'satisfyAll',
		tokenRequirementMax: 0,
		tokenRequirementMin: 0,
		tokenAddress: '',
		allowListPrivate: false,
		setDuration: false,
		numberOfDuration: 0,
		durationUnitTime: 'Month',
		NftSatisfy: false,
	},
	requirementModalItems: {
		nft: false,
		brightId: false,
		token: false,
		allowList: false,
		walletActivity: false,
		contractQuery: false,
		captcha: false,
		learnTap: false,
		gasTap: false,
		discord: false,
		twitter: false,
		poap: false,
		github: false,
		mirror: false,
		opAttestation: false,
		lens: false,
	},
	title: {
		0: 'Prize Info',
		1: 'Time Limitation',
		2: 'Requirements',
		4: 'Contact Info',
		5: 'Deposit Prize',
		6: 'Information Verification',
	},
	canSubmit: false,
	handleChange: () => {},
	handleSelectTokenOrNft: () => {},
	handleSelectLimitEnrollPeopleCheck: () => {},
	closeRequirementModal: () => {},
	openRequirementModal: () => {},
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
	handleChangeNftReq: () => {},
	allowListPrivate: false,
	handleSelectAllowListPrivate: () => {},
	canGoStepTwo: () => {},
	canGoStepThree: () => {},
	canGoStepFive: () => {},
	setDuration: false,
	handleSetDuration: () => {},
	handleSetDurationManually: () => {},
	handleSelectDurationUnitTime: () => {},
	openShowPreviewModal: () => {},
	closeShowPreviewModal: () => {},
	selectNewOffer: false,
	handleSelectNewOffer: () => {},
	handleGOToDashboard: () => {},
	handleAddRequirementNft: () => {},
	nftRequirement: null,
});

export const PrizeOfferFromProvider = ({ children }: PropsWithChildren<{}>) => {
	const title = {
		0: 'Prize Info',
		1: 'Time Limitation',
		2: 'Requirements',
		4: 'Contact Info',
		5: 'Deposit Prize',
		6: 'Information Verification',
	};

	const [nftRequirement, setNftRequirement] = useState<NftRequirementProp | null>(null);

	const handleAddRequirementNft = (requirement: NftRequirementProp) => {
		setNftRequirement({
			...nftRequirement,
			nftRequirementSatisfy: requirement.nftRequirementSatisfy,
			nftRequirementSelectedChain: requirement.nftRequirementSelectedChain,
			nftRequirementNftAddress: requirement.nftRequirementNftAddress,
			nftRequirementCustomID: requirement.nftRequirementCustomID,
			nftRequirementMax: requirement.nftRequirementMax,
			nftRequirementMin: requirement.nftRequirementMin,
		});
	};

	const [selectNewOffer, setSelectNewOffer] = useState<boolean>(false);

	const handleSelectNewOffer = (select: boolean) => {
		setSelectNewOffer(select);
	};

	const [setDuration, setSetDuration] = useState<boolean>(false);

	const handleSetDuration = (e: boolean) => {
		setSetDuration(e);
	};

	const canGoStepTwo = () => {
		const { provider, description, selectedChain } = { ...data };

		if (!provider || !description || !selectedChain) return false;

		return true;
	};

	const canGoStepFive = () => {
		const { email, telegram } = data;

		if (!email || !telegram) return false;
		return true;
	};

	const convertStringToDate = (userDate: string) => {
		let dateParts = userDate.split('/');
		let timeParts = dateParts[2].split(' - ')[1].split(':');
		let dateObject = new Date(
			+dateParts[2].split(' - ')[0],
			+dateParts[1] - 1,
			+dateParts[0],
			+timeParts[0],
			+timeParts[1],
			+timeParts[2],
		);

		return dateObject;
	};

	const checkStartDate = (userDate: Date) => {
		const today = new Date();
		const nextWeek = new Date(today);
		nextWeek.setDate(today.getDate() + 7);
		return userDate > nextWeek;
	};

	const checkEndDate = (end: Date, start: Date) => {
		return end > start;
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

	const canGoStepThree = () => {
		const { startTime, endTime } = { ...data };

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

		const regex = /^(?:0[1-9]|[12]\d|3[01])\/(?:0[1-9]|1[0-2])\/\d{4} - (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

		if (!startTime) {
			errorObject.startDateStatus = false;
			errorObject.statDateStatusMessage = 'Require';
		}

		const dateTimeStringStartTime = startTime;

		if (dateTimeStringStartTime) {
			if (!regex.test(dateTimeStringStartTime)) {
				errorObject.startDateStatus = false;
				errorObject.statDateStatusMessage = 'Invalid time format.';
			}

			if (!errorObject.statDateStatusMessage) {
				let isDateStartDateValid = checkStartDate(convertStringToDate(startTime));
				if (!isDateStartDateValid) {
					errorObject.startDateStatus = false;
					errorObject.statDateStatusMessage = 'The start time must be at least 1 week after now.';
				}
			}
		}

		if (!setDuration && !endTime) {
			errorObject.endDateStatus = false;
			errorObject.endDateStatusMessage = 'Require';
		}

		if (setDuration && !data.numberOfDuration) {
			errorObject.numberOfDurationStatus = false;
			errorObject.numberOfDurationMessage = 'Require';
		}

		const dateTimeStringEndTime = endTime;

		if (!setDuration && dateTimeStringEndTime) {
			if (!regex.test(dateTimeStringEndTime)) {
				errorObject.endDateStatus = false;
				errorObject.endDateStatusMessage = 'Invalid time format';
			}
			if (!errorObject.endDateStatusMessage && dateTimeStringStartTime) {
				let isDateEndDateValid = checkEndDate(
					convertStringToDate(dateTimeStringEndTime),
					convertStringToDate(dateTimeStringStartTime),
				);
				if (!isDateEndDateValid) {
					errorObject.endDateStatus = false;
					errorObject.endDateStatusMessage = 'End date is unacceptable.';
				}
			}
		}

		if (data.limitEnrollPeopleCheck && !data.maximumNumberEnroll) {
			errorObject.maximumLimitationStatus = false;
			errorObject.maximumLimitationMessage = 'Require';
		}

		return errorObject;
	};

	const [searchPhrase, setSearchPhrase] = useState<string>('');

	const [selectedChain, setSelectedChain] = useState<Chain | null>(null);

	const [chainName, setChainName] = useState<string>('');

	const [page, setPage] = useState<number>(0);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const initData: DataProp = {
		provider: '',
		description: '',
		isNft: false,
		selectedChain: null,
		startTime: '',
		endTime: '',
		limitEnrollPeopleCheck: false,
		maximumNumberEnroll: null,
		requirement: '',
		email: '',
		twitter: '',
		discord: '',
		telegram: '',
		necessaryInfo: '',
		satisfy: 'satisfyAll',
		tokenRequirementMax: 0,
		tokenRequirementMin: 0,
		tokenAddress: '',
		allowListPrivate: false,
		setDuration: false,
		numberOfDuration: 0,
		durationUnitTime: 'Month',
		NftSatisfy: false,
	};

	const [data, setData] = useState<DataProp>({
		...initData,
	});

	const [chainList, setChainList] = useState<Chain[]>([]);

	const [allowListPrivate, setAllowListPrivate] = useState<boolean>(false);

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

	const baseRequirementModalItems: RequirementModalItems = {
		nft: false,
		brightId: false,
		token: false,
		allowList: false,
		walletActivity: false,
		contractQuery: false,
		captcha: false,
		learnTap: false,
		gasTap: false,
		discord: false,
		twitter: false,
		poap: false,
		github: false,
		mirror: false,
		opAttestation: false,
		lens: false,
	};

	const handleChangeNftReq = (value: number, logic: string) => {
		setData((prevData) => ({
			...prevData,
			[logic]: value,
		}));
	};

	const handleSetDurationManually = () => {
		setData((prevData) => ({
			...prevData,
			['setDuration']: !data.setDuration,
		}));
	};

	const [requirementModalItems, setRequirementModalItems] = useState<RequirementModalItems>({
		nft: false,
		brightId: false,
		token: false,
		allowList: false,
		walletActivity: false,
		contractQuery: false,
		captcha: false,
		learnTap: false,
		gasTap: false,
		discord: false,
		twitter: false,
		poap: false,
		github: false,
		mirror: false,
		opAttestation: false,
		lens: false,
	});

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
			['limitEnrollPeopleCheck']: !data.limitEnrollPeopleCheck,
		}));
	};

	const handleChange = (e: { target: { type: any; name: any; checked: any; value: any } }) => {
		const type = e.target.type;
		const name = e.target.name;
		const value = type == 'checkbox' ? e.target.checked : e.target.value;
		if (name == 'provider' && value.length > 10) return;
		if (name == 'description' && value.length > 100) return;
		if (name == 'necessaryInfo' && value.length > 100) return;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSelectRequirementModal = (e: string, title: string | null) => {
		setRequirementTitle(title);
		setRequirementModalItems({
			...baseRequirementModalItems,
			[e]: true,
		});
	};

	const handleBackToRequirementModal = () => {
		setRequirementModalItems({
			...baseRequirementModalItems,
		});
		setRequirementTitle(null);
	};

	const { ...requiredInputs } = data;

	const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1;

	const closeRequirementModal = () => {
		setRequirementModalItems({
			...baseRequirementModalItems,
		});
		setRequirementTitle(null);
		setIsModalOpen(false);
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
				handleChangeNftReq,
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
				handleAddRequirementNft,
				nftRequirement,
			}}
		>
			{children}
		</PrizeOfferFormContext.Provider>
	);
};

export default PrizeOfferFormContext;
