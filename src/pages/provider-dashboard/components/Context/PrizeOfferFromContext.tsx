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

const PrizeOfferFormContext = createContext<{
	page: number;
	setPage: (page: number) => void;
	data: DataProp;
	title: any;
	canSubmit: boolean;
	handleChange: (e: any) => void;
	handleSelectTokenOrNft: (e: boolean) => void;
	handleSelectLimitEnrollPeopleCheck: () => void;
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

	const { ...requiredInputs } = data;

	const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1;

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
			}}
		>
			{children}
		</PrizeOfferFormContext.Provider>
	);
};

export default PrizeOfferFormContext;
