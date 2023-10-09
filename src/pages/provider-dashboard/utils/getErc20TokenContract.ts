import { ProviderDashboardFormDataProp } from "types";
import { Web3Provider } from '@ethersproject/providers';
import Erc20_ABI from '../../../abis/Erc20.json';
import { getContract } from "utils";
import { fromWei } from "utils/numbers";

export const getErc20TokenContract = async (data: ProviderDashboardFormDataProp, account: string, provider: Web3Provider, setCheckContractInfo: any, setIsContractAddressValid: any, setData: any, setIsErc20Approved: any) => {
	if (provider && account) {
		const erc20Contract = getContract(data.tokenContractAddress, Erc20_ABI, provider);
		try {
			await erc20Contract.decimals();
		} catch (e) {
			setCheckContractInfo(false);
			setIsContractAddressValid(false);
			return;
		}
		if (erc20Contract) {
			Promise.all([
				erc20Contract.name(),
				erc20Contract.symbol(),
				erc20Contract.decimals(),
				erc20Contract.balanceOf(account),
				erc20Contract.allowance(account, data.selectedChain.erc20PrizetapAddr),
			]).then(([r1, r2, r3, r4, r5]) => {
				setData((prevData: any) => ({
					...prevData,
					tokenName: r1,
					tokenSymbol: r2,
					tokenDecimals: r3,
					userTokenBalance: r4?.toString(),
				}));
				setIsErc20Approved(
					Number(fromWei(r5.toString(), r3)) != 0 &&
						Number(fromWei(r5.toLocaleString(), r3)) >= Number(data.tokenAmount),
				);
				setCheckContractInfo(false);
			});
		}
	}
};