import { useContext } from "react";

import PrizeOfferFormContext from "pages/provider-dashboard/components/Context/PrizeOfferFormContext";
import GasTapContext from "pages/provider-dashboard/components/Context/GasTapContext";


export function usePrizeOfferFormContext() {
	return useContext(PrizeOfferFormContext)
}

export function useGasTapProviderContext() {
	return useContext(GasTapContext)
}
