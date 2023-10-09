import { getContract } from "utils";
import { ConstraintParamValues, ProviderDashboardFormDataProp } from "types";
import { deadline, startAt } from "./deadlineAndStartAt";
import { createRaffleApi, updateCreateRaffleTx } from "api";
import PrizeTap721_ABI from '../../../abis/UnitapPrizeTap721.json';
import { Web3Provider } from '@ethersproject/providers';
import {  TransactionResponse } from '@ethersproject/providers';
import {  TransactionInfo } from 'state/transactions/types';
import { createErc721RaffleCallback } from "hooks/providerDashboard/providerCreateRaffle";


export const createErc721Raffle = async (data: ProviderDashboardFormDataProp,provider: Web3Provider, requirementList: ConstraintParamValues[] ,account: string, userToken:string, setCreateRaffleLoading:any,setCreteRaffleResponse:any, addTransaction : (response: TransactionResponse, info: TransactionInfo) => void) => {

	const raffleContractAddress = data.selectedChain?.erc721PrizetapAddr;
	const maximumNumberEnroll = data.maximumNumberEnroll ? data.maximumNumberEnroll : '1000000000';
	const raffleContract: any = getContract(raffleContractAddress, PrizeTap721_ABI, provider);
	const constraints = requirementList.map((item) => item.pk);
	console.log(constraints);
	const prizeName = data.nftName;

	const raffleData = {
		name: data.provider,
		description: data.description,
		contract: raffleContractAddress,
		creator_name: 'abbas test',
		prizeAmount: 1,
		decimals: 18,
		creator_address: account,
		prize_asset: data.nftContractAddress,
		prize_name: prizeName,
		prize_symbol: data.nftSymbol,
		chain: Number(data.selectedChain.pk),
		constraints,
		constraint_params: btoa(JSON.stringify({})),
		deadline: deadline(data.endTimeStamp),
		max_number_of_entries: maximumNumberEnroll,
		start_at: startAt(data.startTimeStamp),
		nftId: data.nftTokenId,
		isPrizeNft: true,
	};
	const raffle = await createRaffleApi(userToken, raffleData);

	if (!raffle.success) {
		return false;
	}

	const rafflePk = raffle.data.id;
	try {
		setCreateRaffleLoading(true);

		console.log(
			account,
			raffleContract,
			data.nftContractAddress,
			data.nftTokenId,
			maximumNumberEnroll,
			data.startTimeStamp,
			data.endTimeStamp,
		);

		const response = await createErc721RaffleCallback(
			account,
			provider,
			raffleContract,
			data.nftContractAddress,
			data.nftTokenId,
			maximumNumberEnroll,
			data.startTimeStamp,
			data.endTimeStamp,
			addTransaction,
		);

		if (response) {
			response
				.wait()
				.then((res) => {
					console.log(res);
					setCreteRaffleResponse({
						success: true,
						state: 'Done',
						txHash: res.transactionHash,
						message: 'Created raffle successfully.',
					});
					setCreateRaffleLoading(false);
					updateCreateRaffleTx(userToken, rafflePk, res.transactionHash);
				})
				.catch(() => {
					setCreteRaffleResponse({
						success: false,
						state: 'Retry',
						message: 'Something went wrong. Please try again!',
					});
					setCreateRaffleLoading(false);
				});
		}
	} catch (e: any) {
		console.log(e);
		setCreteRaffleResponse({
			success: false,
			state: 'Retry',
			message: 'Something went wrong. Please try again!',
		});
		setCreateRaffleLoading(false);
	}
}