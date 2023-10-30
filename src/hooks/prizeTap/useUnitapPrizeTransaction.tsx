import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { useMemo } from 'react';
import { useTransactionAdder } from 'state/transactions/hooks';
import { TransactionInfo } from 'state/transactions/types';
import { calculateGasMargin } from 'utils/calculateGasMargin';
import { useWalletProvider, useWalletSigner } from 'utils/hook/wallet';
import isZero from 'utils/isZero';
import { TransactionEIP2930 } from 'viem';

interface Call {
	address: string;
	calldata: string;
	value?: string;
}

interface CallEstimate {
	call: Call;
}

interface SuccessfulCall extends CallEstimate {
	call: Call;
	gasEstimate: BigNumber;
}

interface FailedCall extends CallEstimate {
	call: Call;
	error: Error;
}

export default function useUnitapPrizeTransaction(
	account: string | null | undefined,
	chainId: number | undefined,
	calls: Call[],
	info: TransactionInfo,
): { callback: null | (() => Promise<any>) } {
	const signer = useWalletSigner();
	const provider = useWalletProvider();

	const addTransaction = useTransactionAdder();

	return useMemo(() => {
		if (!provider || !account || !chainId) {
			return { callback: null };
		}
		return {
			callback: async function onDibs(): Promise<{ hash: string; from: string; chainId?: number } | undefined> {
				const estimatedCalls: CallEstimate[] = await Promise.all(
					calls.map((call) => {
						const { address, calldata, value } = call;
						const tx =
							!value || isZero(value)
								? { from: account, to: address, data: calldata }
								: {
										from: account,
										to: address,
										data: calldata,
										value: value,
								  };

						return provider
							.estimateGas({
								account: account as any,
								to: address as any,
								data: tx.data as any,
								value: value as any,
							})
							.then((gasEstimate) => {
								return {
									call,
									gasEstimate,
								};
							})
							.catch((gasError) => {
								console.debug('Gas estimate failed, trying eth_call to extract error', call);
								return provider
									.call({
										account: account as any,
										to: address as any,
										data: tx.data as any,
										value: value as any,
									})
									.then((result) => {
										console.debug('Unexpected successful call after failed estimate gas', call, gasError, result);
										console.log(gasError.data.message);
										return {
											call,
											error: <div>Unexpected issue with estimating the gas. Please try again.</div>,
										};
									})
									.catch((callError) => {
										console.debug('Call threw error', call, callError);
										return { call, error: callError.reason ?? callError.message ?? 'Error' };
									});
							});
					}),
				);

				// a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
				let bestCallOption: SuccessfulCall | CallEstimate | undefined = estimatedCalls.find(
					(el, ix, list): el is SuccessfulCall =>
						'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
				);

				// check if any calls errored with a recognizable error
				if (!bestCallOption) {
					const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call);
					if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error;
					const firstNoErrorCall = estimatedCalls.find<CallEstimate>(
						(call): call is CallEstimate => !('error' in call),
					);
					if (!firstNoErrorCall) throw new Error(`Unexpected error. Could not estimate gas for the transaction.`);
					bestCallOption = firstNoErrorCall;
				}

				const {
					call: { address, calldata },
				} = bestCallOption;

				return signer
					?.sendTransaction({
						account: account as any,
						to: address as any,
						data: calldata as any,
						// let the wallet try if we can't estimate the gas
						...('gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {}),
					})
					.then((response) => {
						addTransaction(response, info);
						return { hash: response, from: account, info, chainId };
					})
					.catch((error) => {
						// if the user rejected the tx, pass this along
						if (error?.code === 4001) {
							throw new Error(`Transaction rejected`);
						} else {
							// otherwise, the error was unexpected and we need to convey that
							console.error(`UnitapPassBatchSale Transaction failed`);

							throw new Error(`UnitapPassBatchSale Transaction failed: ${error.reason ?? error.message ?? ''}`);
						}
					});
			},
		};
	}, [provider, account, chainId, calls, addTransaction, info]);
}
