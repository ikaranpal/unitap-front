import { PK } from '.';

export enum Network {
	MAINNET = '0',
	TESTNET = '1',
	ALL = '2',
}

export enum ChainType {
	EVM = 'EVM',
	NONEVM = 'NONEVM',
	NONEVMXDC = 'NONEVMXDC',
	SOLANA = 'Solana',
	LIGHTNING = 'Lightning',
	ALL = 'ALL',
}

export type Chain = {
	pk: PK;
	chainName: string;
	nativeCurrencyName: string;
	symbol: string;
	chainId: string;
	logoUrl: string;
	modalUrl: string;
	explorerUrl: string;
	rpcUrl: string;
	maxClaimAmount: number;
	claimed: string | number;
	unclaimed: string | number;
	decimals: number;
	fundManagerAddress: string;
	totalClaims: number;
	gasImageUrl: string;
	totalClaimsThisRound: number;
	isTestnet: boolean;
	chainType: string;
	needsFunding: boolean;
	blockScanAddress: string;
	tokentapContractAddress?: string;
};

export enum ClaimReceiptState {
	PENDING = 'Pending',
	VERIFIED = 'Verified',
	REJECTED = 'Rejected',
}

export type ClaimReceipt = {
	pk: PK;
	txHash: string | null;
	chain: Chain;
	datetime: string;
	amount: number;
	status: ClaimReceiptState;
};
