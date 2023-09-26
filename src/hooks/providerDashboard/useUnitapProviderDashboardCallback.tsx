import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { CallbackState, UseCallbackReturns } from '../pass/utils';
import useUnitapPrizeTransaction from './useUnitapPrizeTransaction';
import { MintTransactionInfo, TransactionType } from 'state/transactions/types';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { useUnitapPrizeContract } from '../useContract';
import { prizeTapContractAddress } from 'constants/prizeTapcontractAddresses';
import { ZERO_ADDRESS } from 'constants/addresses';

export function useUnitapProviderDashboardCallback(
	payableAmount: BigNumberish | undefined,
	currencyAddress: string | null,
	maxParticipants: BigNumberish | null,
	maxMultiPlier: BigNumberish,
	startTime: BigNumberish | null,
	endTime: BigNumberish | null,
	isNft: boolean,
	collection: string | null,
	tokenId: string | null,
): UseCallbackReturns {
	const { account, chainId, provider } = useWeb3React();
	const isPrizeNft = isNft;
	const prizeContract = useUnitapPrizeContract(
		isNft ? prizeTapContractAddress.erc721 : prizeTapContractAddress.erc20,
		isPrizeNft,
	);

	const calls = useMemo(() => {
		if (
			!prizeContract ||
			!payableAmount ||
			!currencyAddress ||
			!maxParticipants ||
			!maxMultiPlier ||
			!startTime ||
			!endTime ||
			!collection ||
			!tokenId
		) {
			return [];
		}

		const data = [
			{
				address: prizeContract.address,
				calldata: prizeContract.interface.encodeFunctionData('createRaffle', [
					ethers.utils.parseEther(payableAmount.toString()),
					ZERO_ADDRESS,
					maxParticipants,
					maxMultiPlier,
					startTime,
					endTime,
					'0x4554480000000000000000000000000000000000000000000000000000000000',
				]),
				value: payableAmount.toString(),
			},
		];
		return data;
	}, [account, payableAmount, currencyAddress, maxParticipants, endTime, startTime]);

	const info: MintTransactionInfo = {
		type: TransactionType.MINT,
	};

	// console.log(calls);

	const { callback } = useUnitapPrizeTransaction(account, chainId, provider, calls, info);

	return useMemo(() => {
		if (!provider || !account || !chainId || !callback) {
			return { state: CallbackState.INVALID, error: <div>Missing dependencies</div> };
		}

		return {
			state: CallbackState.VALID,
			callback: async () => callback(),
		};
	}, [provider, account, chainId, callback]);
}
