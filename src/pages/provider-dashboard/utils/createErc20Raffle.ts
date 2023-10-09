import { ConstraintParamValues, ProviderDashboardFormDataProp } from "types";
import { toWei } from "utils/numbers";
import { deadline, startAt } from "./deadlineAndStartAt";
import { createRaffleApi, updateCreateRaffleTx } from "api";
import { getContract } from "utils";
import PrizeTap_ABI from '../../../abis/UnitapPrizeTap.json';
import { Web3Provider } from '@ethersproject/providers';
import {  TransactionResponse } from '@ethersproject/providers';
import {  TransactionInfo } from 'state/transactions/types';
import { createErc20RaffleCallback } from "hooks/providerDashboard/providerCreateRaffle";

export const createErc20Raffle = async (data: ProviderDashboardFormDataProp,provider: Web3Provider, requirementList: ConstraintParamValues[] ,account: string, userToken:string, setCreateRaffleLoading:any,setCreteRaffleResponse:any, addTransaction : (response: TransactionResponse, info: TransactionInfo) => void) => {

	const raffleContractAddress = data.selectedChain?.erc20PrizetapAddr;
	const maximumNumberEnroll = data.maximumNumberEnroll ? data.maximumNumberEnroll : '1000000000';
	const prizeName = data.isNativeToken
		? data.tokenAmount + ' ' + data.selectedChain.symbol
		: data.tokenAmount + ' ' + data.tokenSymbol;

	const prizeSymbol = data.isNativeToken ? data.selectedChain.symbol : data.tokenSymbol;

	const decimals = data.isNativeToken ? 18 : data.tokenDecimals;
	const prizeAmount = toWei(data.tokenAmount, data.isNativeToken ? 18 : data.tokenDecimals);

	const constraints = requirementList.map((item) => item.pk);

	const raffleData = {
		name: data.provider,
		description: data.description,
		contract: raffleContractAddress,
		creator_name: 'abbas test',
		creator_address: account,
		prize_amount: prizeAmount,
		prize_asset: data.tokenContractAddress,
		prize_name: prizeName,
		prize_symbol: prizeSymbol,
		decimals: decimals,
		chain: Number(data.selectedChain.pk),
		constraints,
		constraint_params: btoa(JSON.stringify({})),
		deadline: deadline(data.endTimeStamp),
		max_number_of_entries: maximumNumberEnroll,
		start_at: startAt(data.startTimeStamp),
	};
	const raffle = await createRaffleApi(userToken, raffleData);
	if (!raffle.success) {
		return false;
	}

	const rafflePk = raffle.data.id;

	const raffleContract: any = getContract(raffleContractAddress, PrizeTap_ABI, provider);

	try {
		setCreateRaffleLoading(true);

		const response = await createErc20RaffleCallback(
			account,
			raffleContract,
			provider,
			data.tokenAmount,
			decimals,
			addTransaction,
			data.tokenContractAddress,
			maximumNumberEnroll,
			data.startTimeStamp,
			data.endTimeStamp,
			data.isNativeToken,
		);

		if (response) {
			response
				.wait()
				.then((res: any) => {
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