import { useContext } from "react";

import PrizeOfferFormContext from "pages/provider-dashboard/components/Context/PrizeOfferFromContext";


function usePrizeOfferFormContext() {
	return useContext(PrizeOfferFormContext)
}

export default usePrizeOfferFormContext