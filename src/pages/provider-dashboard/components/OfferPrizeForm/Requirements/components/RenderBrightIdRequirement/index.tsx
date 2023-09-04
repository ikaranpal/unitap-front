import { useEffect, useState } from 'react';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import BrightIdRequirementDropDown from './brightIdRequirementDropDown';
import Icon from 'components/basic/Icon/Icon';

const RenderBrightIdRequirement = () => {
	const { handleBackToRequirementModal, handleAddRequirementBrightId, brightIdRequirement } =
		usePrizeOfferFormContext();

	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [brightSatisfy, setBrightSatisfy] = useState<boolean | null>(null);

	const onSelectType = (type: string) => {
		setSelectedType(type);
	};

	useEffect(() => {
		if (brightIdRequirement?.brightIdRequirementType) {
			setSelectedType(brightIdRequirement.brightIdRequirementType);
			setBrightSatisfy(brightIdRequirement.brightIdRequirementSatisfy);
		}
	}, []);

	const handleAddRequirement = () => {
		handleBackToRequirementModal();
		handleAddRequirementBrightId({
			brightIdRequirementSatisfy: brightSatisfy,
			brightIdRequirementType: selectedType,
		});
	};

	return (
		<div className="flex flex-col gap-2 mt-5 ">
			<div className="absolute top-5 cursor-pointer z-[999]" onClick={handleBackToRequirementModal}>
				<Icon iconSrc="assets/images/provider-dashboard/arrow-left.svg" className="cursor-pointer z-[999999]" />
			</div>
			<div className="flex flex-col gap-2 min-h-[310px]">
				<div className="flex justify-between gap-3 text-white text-[14px] font-medium mb-5">
					<div
						onClick={() => setBrightSatisfy(true)}
						className={`${
							brightSatisfy ? 'bg-gray80' : 'bg-gray50'
						}  cursor-pointer w-full rounded-xl h-[32px] flex items-center justify-center`}
					>
						Should satisfy
					</div>
					<div
						onClick={() => setBrightSatisfy(false)}
						className={`${
							!brightSatisfy ? 'bg-gray80' : 'bg-gray50'
						} bg-gray50 cursor-pointer w-full rounded-xl h-[32px] flex items-center justify-center`}
					>
						Should not satisfy
					</div>
				</div>
				<BrightIdRequirementDropDown selectedType={selectedType} onSelectType={(type) => onSelectType(type)} />
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
