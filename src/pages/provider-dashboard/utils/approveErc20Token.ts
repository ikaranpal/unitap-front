import { ProviderDashboardFormDataProp } from "types";
import { Web3Provider } from '@ethersproject/providers';
import Erc20_ABI from '../../../abis/Erc20.json';
import { getContract } from "utils";
import { approveErc20TokenCallback } from "hooks/providerDashboard/providerCreateRaffle";
import {  TransactionResponse } from '@ethersproject/providers';
import {  TransactionInfo } from 'state/transactions/types';

export const approveErc20Token = async (data: ProviderDashboardFormDataProp, provider: Web3Provider, account: string, setApproveLoading: any, setIsErc20Approved:any, addTransaction : (response: TransactionResponse, info: TransactionInfo) => void) => {
	
	if (provider && account) {
		const erc20Contract: any = getContract(data.tokenContractAddress, Erc20_ABI, provider);
		try {
			setApproveLoading(true);
			const response = await approveErc20TokenCallback(
				account,
				erc20Contract,
				data.selectedChain.erc20PrizetapAddr,
				data.tokenContractAddress,
				provider,
				data.tokenAmount,
				data.tokenDecimals,
				addTransaction,
			);

			if (response) {
				response
					.wait()
					.then((res) => {
						setApproveLoading(false);
						setIsErc20Approved(true);
					})
					.catch(() => {
						setApproveLoading(false);
					});
			}
		} catch (e: any) {
			console.log(e);
			setApproveLoading(false);
		}
	}
};
