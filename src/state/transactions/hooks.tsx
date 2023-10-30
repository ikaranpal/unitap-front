import { TransactionResponse } from '@ethersproject/providers';
import { Token } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';

import { addTransaction } from './reducer';
import { TransactionDetails, TransactionInfo, TransactionType } from './types';
import { useWalletAccount, useWalletNetwork } from 'utils/hook/wallet';

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (hash: string, info: TransactionInfo) => void {
	const { address } = useWalletAccount();
	const { chain } = useWalletNetwork();
	const chainId = chain?.id;

	const dispatch = useAppDispatch();

	return useCallback(
		(hash: string, info: TransactionInfo) => {
			if (!address) return;
			if (!chainId) return;

			if (!hash) {
				throw Error('No transaction hash found.');
			}
			dispatch(addTransaction({ hash, from: address, info, chainId }));
		},
		[address, chainId, dispatch],
	);
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
	const { chainId } = useWeb3React();

	const state = useAppSelector((state) => state.transactions);

	return chainId ? state[chainId] ?? {} : {};
}

export function useTransaction(transactionHash?: string): TransactionDetails | undefined {
	const allTransactions = useAllTransactions();

	if (!transactionHash) {
		return undefined;
	}

	return allTransactions[transactionHash];
}

export function useIsTransactionPending(transactionHash?: string): boolean {
	const transactions = useAllTransactions();

	if (!transactionHash || !transactions[transactionHash]) return false;

	return !transactions[transactionHash].receipt;
}

export function useIsTransactionConfirmed(transactionHash?: string): boolean {
	const transactions = useAllTransactions();

	if (!transactionHash || !transactions[transactionHash]) return false;

	return Boolean(transactions[transactionHash].receipt);
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
	return new Date().getTime() - tx.addedTime < 86_400_000;
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(token?: Token, spender?: string): boolean {
	const allTransactions = useAllTransactions();
	return useMemo(
		() =>
			typeof token?.address === 'string' &&
			typeof spender === 'string' &&
			Object.keys(allTransactions).some((hash) => {
				const tx = allTransactions[hash];
				if (!tx) return false;
				if (tx.receipt) {
					return false;
				} else {
					if (tx.info.type !== TransactionType.APPROVAL) return false;
					return tx.info.spender === spender && tx.info.tokenAddress === token.address && isTransactionRecent(tx);
				}
			}),
		[allTransactions, spender, token?.address],
	);
}
