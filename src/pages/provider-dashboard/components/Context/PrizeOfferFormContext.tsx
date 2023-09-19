import { getChainList } from 'api';
import { createContext, useState, useEffect, PropsWithChildren, useCallback, SetStateAction, useMemo } from 'react';
import { Chain, ProviderDashboardFormDataProp } from 'types';
import { checkRegexDateValidation, checkEndDate, checkStartDate } from './utils/checkDateValidation';

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
	handleChangeNftReq: (value: number, logic: string) => void;
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
});

export const PrizeOfferFormProvider = ({ children }: PropsWithChildren<{}>) => {
	const [requirementList, setRequirementList] = useState<RequirementProps[]>([]);
	const insertRequirement = (requirements: RequirementProps) => {
		setRequirementList([...requirementList, requirements]);
	};

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

	const canGoStepTwo = () => {
		const { provider, description, selectedChain } = data;
		return !!(provider && description && selectedChain);
	};

	const canGoStepFive = () => {
		const { email, telegram } = data;
		return !!(email && telegram);
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

		return errorObject;
	};

	const [searchPhrase, setSearchPhrase] = useState<string>('');

	const [selectedChain, setSelectedChain] = useState<Chain | null>(null);

	const [chainName, setChainName] = useState<string>('');

	const [page, setPage] = useState<number>(0);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [data, setData] = useState<ProviderDashboardFormDataProp>({
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
				insertRequirement,
				requirementList,
				deleteRequirement,
				updateRequirement,
			}}
		>
			{children}
		</PrizeOfferFormContext.Provider>
	);
};

export default PrizeOfferFormContext;
