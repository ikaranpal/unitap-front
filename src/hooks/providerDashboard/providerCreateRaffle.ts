import { BigNumber, BigNumberish, ethers } from 'ethers';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { ApproveTransactionInfo, MintTransactionInfo, TransactionInfo, TransactionType } from 'state/transactions/types';
import isZero from 'utils/isZero';
import { calculateGasMargin } from 'utils/web3';
import { ZERO_ADDRESS } from 'constants/addresses';
import { UnitapPrizeTap, UnitapPrizeTap721, Erc20, Erc721 } from 'abis/types';
import { toWei } from 'utils/numbers';


interface Call {
	address: string;
	calldata: string;
	value: string;
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

export const createErc20RaffleCallback = async (
	account: string,
	raffleContract: UnitapPrizeTap,
	provider: JsonRpcProvider,
	payableAmount: BigNumber | string,
	tokenDecimals: number,
	addTransaction: (response: TransactionResponse, info: TransactionInfo) => void,
	currencyAddress: string ,
	maxParticipants: BigNumberish ,
	startTime: BigNumberish ,
	endTime: BigNumberish,
	isNativeToken: boolean
) => {
	console.log(
		account,
		payableAmount,
		tokenDecimals,
		currencyAddress,
		maxParticipants,
		startTime,
		endTime,
		isNativeToken,
	)

	const info: MintTransactionInfo = {
		type: TransactionType.MINT,
	};

	const calls = [
		{
			address: raffleContract.address,
			calldata:
			raffleContract.interface.encodeFunctionData('createRaffle', [
				isNativeToken ? ethers.utils.parseEther(payableAmount.toString()) : toWei(payableAmount.toString(), tokenDecimals) ,
				currencyAddress,
				maxParticipants,
				1,
				startTime,
				endTime,
				'0x4554480000000000000000000000000000000000000000000000000000000000',
				]) ?? '',
			value: currencyAddress == ZERO_ADDRESS ? payableAmount.toString() : '0',
		},
	];

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
							value: ethers.utils.parseEther(value),
					  };

			return provider
				.estimateGas(tx)
				.then((gasEstimate) => {
					return {
						call,
						gasEstimate,
					};
				})
				.catch((gasError) => {
					console.debug('Gas estimate failed, trying eth_call to extract error', call);

					return provider
						.call(tx)
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

	return provider
		.getSigner()
		.sendTransaction({
			from: account,
			to: address,
			data: calldata,
			...('gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {}),
			...(value && !isZero(value) ? { 	value: ethers.utils.parseEther(value) } : {}),
		})
		.then((response) => {
			addTransaction(response, info);
			return response;
		})
		.catch((error) => {
			// if the user rejected the tx, pass this along
			if (error?.code === 4001) {
				throw new Error(`Transaction rejected`);
			} else {
				// otherwise, the error was unexpected and we need to convey that
				console.error(`Transaction failed`);

				throw new Error(`Transaction failed: ${error.reason ?? error.message ?? ''}`);
			}
		});
};


export const createErc721RaffleCallback = async (
	account: string,
	provider: JsonRpcProvider,
	raffleContract: UnitapPrizeTap721,
	currencyAddress: string ,
	tokenId: BigNumberish,
	maxParticipants: BigNumberish ,
	startTime: BigNumberish ,
	endTime: BigNumberish,
	addTransaction: (response: TransactionResponse, info: TransactionInfo) => void,
) => {
	const info: MintTransactionInfo = {
		type: TransactionType.MINT,
	};

	const calls = [
		{
			address: raffleContract.address,
			calldata:
			raffleContract.interface.encodeFunctionData('createRaffle', [
				currencyAddress,
				tokenId,
				maxParticipants,
				1,
				startTime,
				endTime,
				'0x4554480000000000000000000000000000000000000000000000000000000000',
				]) ?? '',
			value: '0',
		},
	];

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
							value: ethers.utils.parseEther(value),
					  };

			return provider
				.estimateGas(tx)
				.then((gasEstimate) => {
					return {
						call,
						gasEstimate,
					};
				})
				.catch((gasError) => {
					console.debug('Gas estimate failed, trying eth_call to extract error', call);

					return provider
						.call(tx)
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

	return provider
		.getSigner()
		.sendTransaction({
			from: account,
			to: address,
			data: calldata,
			...('gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {}),
			...(value && !isZero(value) ? { 	value: ethers.utils.parseEther(value) } : {}),
		})
		.then((response) => {
			addTransaction(response, info);
			return response;
		})
		.catch((error) => {
			// if the user rejected the tx, pass this along
			if (error?.code === 4001) {
				throw new Error(`Transaction rejected`);
			} else {
				// otherwise, the error was unexpected and we need to convey that
				console.error(`Transaction failed`);

				throw new Error(`Transaction failed: ${error.reason ?? error.message ?? ''}`);
			}
		});
};


export const approveErc20TokenCallback = async (
	account: string,
	erc20Contract: Erc20,
	spenderAddress: string,
	tokenAddress: string,
	provider: JsonRpcProvider,
	payableAmount: BigNumber | string,
	decimals: number ,
	addTransaction: (response: TransactionResponse, info: TransactionInfo) => void,
) => {
	const info: ApproveTransactionInfo = {
		type: TransactionType.APPROVAL,
		tokenAddress: tokenAddress,
		spender: spenderAddress
	};

	const calls = [
		{
			address: erc20Contract.address,
			calldata:
			erc20Contract.interface.encodeFunctionData('approve', [
				spenderAddress,
				toWei(payableAmount.toString(), decimals)
				]) ?? '',
			value: '0'
		},
	];

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
							value: ethers.utils.parseEther(value),
					  };

			return provider
				.estimateGas(tx)
				.then((gasEstimate) => {
					return {
						call,
						gasEstimate,
					};
				})
				.catch((gasError) => {
					console.debug('Gas estimate failed, trying eth_call to extract error', call);

					return provider
						.call(tx)
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

	return provider
		.getSigner()
		.sendTransaction({
			from: account,
			to: address,
			data: calldata,
			...('gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {}),
			...(value && !isZero(value) ? { 	value: ethers.utils.parseEther(value) } : {}),
		})
		.then((response) => {
			addTransaction(response, info);
			return response;
		})
		.catch((error) => {
			// if the user rejected the tx, pass this along
			if (error?.code === 4001) {
				throw new Error(`Transaction rejected`);
			} else {
				// otherwise, the error was unexpected and we need to convey that
				console.error(`Transaction failed`);

				throw new Error(`Transaction failed: ${error.reason ?? error.message ?? ''}`);
			}
		});
};



export const approveErc721TokenCallback = async (
	account: string,
	erc721Contract: Erc721,
	spenderAddress: string,
	tokenAddress: string,
	provider: JsonRpcProvider,
	nftTokenId: number,
	addTransaction: (response: TransactionResponse, info: TransactionInfo) => void,
) => {
	const info: ApproveTransactionInfo = {
		type: TransactionType.APPROVAL,
		tokenAddress: tokenAddress,
		spender: spenderAddress
	};

	const calls = [
		{
			address: erc721Contract.address,
			calldata:
			erc721Contract.interface.encodeFunctionData('approve', [
				spenderAddress,
				nftTokenId
				]) ?? '',
			value: '0'
		},
	];

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
							value: ethers.utils.parseEther(value),
					  };

			return provider
				.estimateGas(tx)
				.then((gasEstimate) => {
					return {
						call,
						gasEstimate,
					};
				})
				.catch((gasError) => {
					console.debug('Gas estimate failed, trying eth_call to extract error', call);

					return provider
						.call(tx)
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

	return provider
		.getSigner()
		.sendTransaction({
			from: account,
			to: address,
			data: calldata,
			...('gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {}),
			...(value && !isZero(value) ? { 	value: ethers.utils.parseEther(value) } : {}),
		})
		.then((response) => {
			addTransaction(response, info);
			return response;
		})
		.catch((error) => {
			// if the user rejected the tx, pass this along
			if (error?.code === 4001) {
				throw new Error(`Transaction rejected`);
			} else {
				// otherwise, the error was unexpected and we need to convey that
				console.error(`Transaction failed`);

				throw new Error(`Transaction failed: ${error.reason ?? error.message ?? ''}`);
			}
		});
};