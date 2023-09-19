import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useEffect, useState } from 'react';
import SelectMethodDropDown from './SelectMethodDropDown';
import ChainDropDown from './ChainDropDown';
import { Chain } from 'types';
import { RequirementTypes } from 'pages/provider-dashboard/components/Context/PrizeOfferFormContext';
import { NftRequirementProp } from 'pages/provider-dashboard/components/Context/PrizeOfferFormContext';
import useAddRequirement from 'pages/provider-dashboard/hooks/useAddRequirement';
const requirementInit = {
	type: RequirementTypes.NFT,
	nftRequirementSatisfy: true,
	nftRequirementSelectedChain: null,
	nftRequirementNftAddress: null,
	nftRequirementCustomID: null,
	nftRequirementMax: 0,
	nftRequirementMin: 0,
};

interface Prop {
	label: string;
}

const RenderNftRequirement = ({ label }: Prop) => {
	const [requirements, setRequirements] = useState<NftRequirementProp>(requirementInit);
	const { handleBackToRequirementModal, requirementList } = usePrizeOfferFormContext();
	const addRequirement = useAddRequirement();
	const existRequirement: any = requirementList.find((item) => item.type == label);
	useEffect(() => {
		if (existRequirement) {
			setRequirements(existRequirement);
		}
	}, []);

	const onSelectChain = (chain: Chain) => {
		setRequirements({ ...requirements, nftRequirementSelectedChain: chain });
	};

	const handleSetMax = (val: number) => {
		setRequirements({ ...requirements, nftRequirementMax: val });
	};

	const handleSetMin = (val: number) => {
		setRequirements({ ...requirements, nftRequirementMin: val });
	};

	const handleSetCustomId = (val: number) => {
		setRequirements({ ...requirements, nftRequirementCustomID: val });
	};

	const handleChange = (e: { target: { value: string } }) => {
		setRequirements({ ...requirements, nftRequirementNftAddress: e.target.value });
	};

	const handleAddRequirement = () => {
		addRequirement(existRequirement, requirements, label);
	};

	const handleSetSatisfy = (e: boolean) => {
		setRequirements({ ...requirements, nftRequirementSatisfy: e });
	};

	return (
		<div className="flex flex-col gap-2 mt-5">
			<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
				<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
			</div>
			<div className="flex flex-col gap-2 min-h-[310px]">
				<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
					<div
						className={`${
							requirements.nftRequirementSatisfy ? 'bg-gray90' : 'bg-gray50'
						} "bg-gray50 bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center cursor-pointer`}
						onClick={() => handleSetSatisfy(true)}
					>
						Should satisfy
					</div>
					<div
						onClick={() => handleSetSatisfy(false)}
						className={`${
							!requirements.nftRequirementSatisfy ? 'bg-gray90' : 'bg-gray50'
						} bg-gray50 w-full rounded-xl h-[32px] flex items-center justify-center cursor-pointer`}
					>
						Should not satisfy
					</div>
				</div>
				<ChainDropDown selectedChain={requirements.nftRequirementSelectedChain} onSelectChain={onSelectChain} />
				<div className="flex bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2">
					<input
						onChange={(e) => handleChange(e)}
						value={requirements.nftRequirementNftAddress ?? ''}
						name="nftAddress"
						className="bg-transparent w-full h-[100%]  placeholder-gray80"
						placeholder="Paste NFT address"
					/>
				</div>
				<SelectMethodDropDown
					nftMaximum={requirements.nftRequirementMax}
					handleSetMaximum={(val) => handleSetMax(val)}
					nftMinimum={requirements.nftRequirementMin}
					handleSetMinimum={(val) => handleSetMin(val)}
					customId={requirements.nftRequirementCustomID}
					handleSetCustomId={(val) => handleSetCustomId(val)}
				/>
			</div>
			<div
				onClick={handleAddRequirement}
				className="flex cursor-pointer bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2"
			>
				Add Requirement
			</div>
		</div>
	);
};

export default RenderNftRequirement;
