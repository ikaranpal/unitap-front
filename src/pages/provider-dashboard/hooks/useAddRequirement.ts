import usePrizeOfferFormContext from "hooks/usePrizeOfferFormContext";

const useAddRequirement =  () => {
	const { handleBackToRequirementModal, insertRequirement, updateRequirement } =
	usePrizeOfferFormContext();
	const addRequirements = (existRequirement: any, params:any, id:number) => {
		if(id) {
			console.log(existRequirement)
			handleBackToRequirementModal();
			if (!existRequirement) {
				insertRequirement(params);
			} else {
				updateRequirement(id, params);
			}
		}
	}
	return addRequirements
}

export default useAddRequirement;