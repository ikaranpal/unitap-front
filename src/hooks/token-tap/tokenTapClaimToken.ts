import { UnitapEVMTokenTap } from 'abis/types';
import { BigNumber, BytesLike } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers';
import { MintTransactionInfo, TransactionInfo, TransactionType } from 'state/transactions/types';
import isZero from 'utils/isZero';
import { calculateGasMargin } from 'utils/web3';
import { PublicClient } from 'viem';
import { callProvider, estimateGas, useWalletSigner } from 'utils/hook/wallet';
import { Chain } from 'types';

interface Call {
	address: string;
	calldata: string;
	value: bigint;
}

interface CallEstimate {
	call: Call;
}

interface SuccessfulCall extends CallEstimate {
	call: Call;
	gasEstimate: bigint;
}

interface FailedCall extends CallEstimate {
	call: Call;
	error: Error;
}

export const claimTokenCallback = async (
	user: string,
	token: string,
	amount: number | string,
	nonce: number | string,
	signature: BytesLike,
	evmTokenTapContract: UnitapEVMTokenTap,
	account: string,
	_chainId: number,
	provider: PublicClient,
	signer: ReturnType<typeof useWalletSigner>,
	addTransaction: (hash: string, info: TransactionInfo) => void,
	claimAddress: string,
	chain: Chain,
) => {
	const info: MintTransactionInfo = {
		type: TransactionType.MINT,
	};

	const calls = [
		{
			address: claimAddress,
			calldata:
				evmTokenTapContract.interface.encodeFunctionData('claimToken', [
					user,
					token,
					BigInt(amount),
					nonce,
					signature,
				]) ?? '',
			value: BigInt(0),
		},
	];

	const estimatedCalls: CallEstimate[] = await Promise.all(
		calls.map((call) => {
			const { address, calldata, value } = call;

			const tx =
				!value || isZero(value)
					? { account: address, to: account, data: calldata }
					: {
							account: address,
							to: account,
							data: calldata,
							value: value,
					  };

			return estimateGas(provider, {
				from: tx.account,
				to: tx.to,
				data: calldata,
				value: BigInt(value),
			})
				.then((gasEstimate) => {
					return {
						call,
						gasEstimate,
					};
				})
				.catch((gasError) => {
					console.debug('Gas estimate failed, trying eth_call to extract error', call);

					return callProvider(provider, {
						from: tx.account,
						to: tx.to,
						data: calldata,
						value: BigInt(value),
					})
						.then((result) => {
							console.debug('Unexpected successful call after failed estimate gas', call, gasError, result);
							return { call, error: 'Unexpected issue with estimating the gas. Please try again' };
						})
						.catch((callError) => {
							console.debug('Call threw error', call, callError);
							return { call, error: callError.reason ?? callError.message ?? 'Error' };
						});
				});
		}),
	);

	let bestCallOption: SuccessfulCall | CallEstimate | undefined = estimatedCalls.find(
		(el, ix, list): el is SuccessfulCall =>
			'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
	);

	// check if any calls errored with a recognizable error
	if (!bestCallOption) {
		const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call);
		if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error;
		const firstNoErrorCall = estimatedCalls.find<CallEstimate>((call): call is CallEstimate => !('error' in call));
		if (!firstNoErrorCall) throw new Error(`Unexpected error. Could not estimate gas for the transaction.`);
		bestCallOption = firstNoErrorCall;
	}

	const {
		call: { address, calldata, value },
	} = bestCallOption;

	return signer
		?.sendTransaction({
			account: address as any,
			to: account as any,
			data: calldata as any,
			...('gasEstimate' in bestCallOption
				? { gasLimit: calculateGasMargin(BigNumber.from(bestCallOption.gasEstimate)) }
				: {}),
			...(value && !isZero(value) ? { value } : {}),
			chain: {
				id: Number(chain.chainId),
				name: chain.chainName,
				nativeCurrency: {
					decimals: chain.decimals,
					name: chain.nativeCurrencyName,
					symbol: chain.symbol,
				},
				network: chain.chainName,
				rpcUrls: {
					default: {
						http: [chain.rpcUrl],
					},
					public: {
						http: [chain.rpcUrl],
					},
				},
			},
		})
		.then((response) => {
			addTransaction(response, info);
			return response;
		})
		.catch((error) => {
			console.log(error);
			// if the user rejected the tx, pass this along
			if (error?.code === 4001) {
				throw new Error(`Transaction rejected`);
			} else {
				// otherwise, the error was unexpected and we need to convey that
				console.error(`TokenTap Transaction failed`);

				throw new Error(`TokenTap Transaction failed: ${error.reason ?? error.message ?? ''}`);
			}
		});
};
