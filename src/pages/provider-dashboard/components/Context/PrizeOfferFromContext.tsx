import { createContext, useState, useEffect, PropsWithChildren } from 'react';

interface DataProp {
	provider: string;
	description: string;
	isNft: boolean;
	selectedChain: string;
	startTime: string;
	endTime: string;
	limitEnrollPeopleCheck: boolean;
	maximumNumberEnroll: string;
	requirement: string;
	email: string;
	twitter: string;
	discord: string;
	telegram: string;
	necessaryInfo: string;
}

interface RequirementModalItems {
	nft: boolean;
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
	closeRequirementModal: () => void;
	openRequirementModal: () => void;
	handleSelectRequirementModal: (e: string, title: string) => void;
	isModalOpen: boolean;
	requirementTitle: string | null;
	handleBackToRequirementModal: () => void;
}>({
	page: 0,
	setPage: () => {},
	data: {
		provider: '',
		description: '',
		isNft: false,
		selectedChain: '',
		startTime: '',
		endTime: '',
		limitEnrollPeopleCheck: false,
		maximumNumberEnroll: '',
		requirement: '',
		email: '',
		twitter: '',
		discord: '',
		telegram: '',
		necessaryInfo: '',
	},
	requirementModalItems: {
		nft: false,
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

	const [page, setPage] = useState<number>(0);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [data, setData] = useState({
		provider: '',
		description: '',
		isNft: false,
		selectedChain: '',
		startTime: '',
		endTime: '',
		limitEnrollPeopleCheck: false,
		maximumNumberEnroll: '',
		requirement: '',
		email: '',
		twitter: '',
		discord: '',
		telegram: '',
		necessaryInfo: '',
	});

	const baseRequirementModalItems: RequirementModalItems = {
		nft: false,
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

	const [requirementModalItems, setRequirementModalItems] = useState<RequirementModalItems>({
		nft: false,
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
		console.log(e);
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
			}}
		>
			{children}
		</PrizeOfferFormContext.Provider>
	);
};

export default PrizeOfferFormContext;
