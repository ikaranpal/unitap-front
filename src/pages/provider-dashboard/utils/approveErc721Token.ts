import Erc721_ABI from '../../../abis/Erc721.json';
import { ProviderDashboardFormDataProp } from "types";
import { Web3Provider } from '@ethersproject/providers';
import { getContract } from "utils";
import { approveErc721TokenCallback } from "hooks/providerDashboard/providerCreateRaffle";
import {  TransactionResponse } from '@ethersproject/providers';
import {  TransactionInfo } from 'state/transactions/types';

export const approveErc721Token = async (data: ProviderDashboardFormDataProp, provider: Web3Provider, account: string, setApproveLoading: any, setIsNftApproved:any, addTransaction : (response: TransactionResponse, info: TransactionInfo) => void) => {
	if (provider && account) {
		const erc721Contract: any = getContract(data.nftContractAddress, Erc721_ABI, provider);
		try {
			setApproveLoading(true);
			const response = await approveErc721TokenCallback(
				account,
				erc721Contract,
				data.selectedChain.erc721PrizetapAddr,
				data.nftContractAddress,
				provider,
				data.nftTokenId,
				addTransaction,
			);

			if (response) {
				response
					.wait()
					.then((res) => {
						setApproveLoading(false);
						setIsNftApproved(true);
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
}
