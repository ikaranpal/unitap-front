import usePrizeOfferFormContext from "hooks/usePrizeOfferFormContext";
import { ConstraintParamValues } from "types";

const useAddRequirement =  () => {
	const { handleBackToRequirementModal, insertRequirement, updateRequirement } =
	usePrizeOfferFormContext();
	const addRequirements = (existRequirement: any, params: ConstraintParamValues | null, id:number) => {
		if(id) {
			handleBackToRequirementModal();
			if (!existRequirement) {
				insertRequirement(params, id);
			} else {
				updateRequirement(id, params);
			}
		}
	}
	return addRequirements
}

export default useAddRequirement;