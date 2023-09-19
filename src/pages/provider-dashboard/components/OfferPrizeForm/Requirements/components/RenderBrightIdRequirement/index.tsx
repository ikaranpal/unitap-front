import { useEffect, useState } from 'react';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import BrightIdRequirementDropDown from './brightIdRequirementDropDown';
import Icon from 'components/basic/Icon/Icon';
import { RequirementTypes } from 'pages/provider-dashboard/components/Context/PrizeOfferFormContext';
import { BrightIdRequirementProp } from 'pages/provider-dashboard/components/Context/PrizeOfferFormContext';
import useAddRequirement from 'pages/provider-dashboard/hooks/useAddRequirement';

interface Prop {
	label: string;
}

const requirementInit = {
	type: RequirementTypes.BRIGHT_ID,
	brightIdRequirementSatisfy: true,
	brightIdRequirementType: null,
};

const RenderBrightIdRequirement = ({ label }: Prop) => {
	const { handleBackToRequirementModal, requirementList } = usePrizeOfferFormContext();
	const addRequirement = useAddRequirement();
	const [requirements, setRequirements] = useState<BrightIdRequirementProp>(requirementInit);
	const existRequirement: any = requirementList.find((item) => item.type == label);

	const onSelectType = (type: string) => {
		setRequirements({ ...requirements, brightIdRequirementType: type });
	};

	useEffect(() => {
		if (existRequirement) {
			setRequirements(existRequirement);
		}
	}, []);

	const handleSetSatisfy = (e: boolean) => {
		setRequirements({ ...requirements, brightIdRequirementSatisfy: e });
	};

	const handleAddRequirement = () => {
		addRequirement(existRequirement, requirements, label);
	};

	return (
		<div className="flex flex-col gap-2 mt-5 ">
			<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
				<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
			</div>
			<div className="flex flex-col gap-2 min-h-[310px]">
				<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
					<div
						onClick={() => handleSetSatisfy(true)}
						className={`${
							requirements.brightIdRequirementSatisfy ? 'bg-gray80' : 'bg-gray50'
						}  cursor-pointer w-full rounded-xl h-[32px] flex items-center justify-center`}
					>
						Should satisfy
					</div>
					<div
						onClick={() => handleSetSatisfy(false)}
						className={`${
							!requirements.brightIdRequirementSatisfy ? 'bg-gray80' : 'bg-gray50'
						} bg-gray50 cursor-pointer w-full rounded-xl h-[32px] flex items-center justify-center`}
					>
						Should not satisfy
					</div>
				</div>
				<BrightIdRequirementDropDown
					selectedType={requirements.brightIdRequirementType}
					onSelectType={(type) => onSelectType(type)}
				/>
			</div>
			<div
				onClick={handleAddRequirement}
				className="flex cursor-pointer  bg-gray40 text-[14px] font-semibold text-white h-[44px] border-2 border-gray70 rounded-xl items-center justify-center mb-2"
			>
				Add Requirement
			</div>
		</div>
	);
};

export default RenderBrightIdRequirement;
