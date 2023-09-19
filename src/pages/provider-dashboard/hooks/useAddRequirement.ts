import usePrizeOfferFormContext from "hooks/usePrizeOfferFormContext";

const useAddRequirement =  () => {
	const { handleBackToRequirementModal, insertRequirement, updateRequirement } =
	usePrizeOfferFormContext();
	const addRequirement = (existRequirement: any, requirements:any, label:string) => {
		if(requirements && label) {
			handleBackToRequirementModal();
			if (!existRequirement) {
				insertRequirement(requirements);
			} else {
				updateRequirement(label, requirements);
			}
		}
	}
	return addRequirement
}

export default useAddRequirement;