import { useContext } from "react";

import PrizeOfferFormContext from "pages/provider-dashboard/components/Context/PrizeOfferFormContext";


function usePrizeOfferFormContext() {
	return useContext(PrizeOfferFormContext)
}

export default usePrizeOfferFormContext