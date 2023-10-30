import { useUnitapPassContract } from 'hooks/useContract';
import { useEffect, useState } from 'react';
import { UnitapPassMain } from '../../abis/types';
import useBlockNumber from 'lib/hooks/useBlockNumber';
import { useWalletAccount } from 'utils/hook/wallet';

export type ContractFunctionReturnType<T> = T extends (...args: any) => Promise<infer R>
	? // TODO: handle struct return type
	  R extends [...params: any[]]
		? any[]
		: R extends void
		? void
		: R
	: any;

export function useUnitapPass() {
	const unitapPassContract = useUnitapPassContract();
	const { address } = useWalletAccount();
	const [balance, setBalance] = useState<
		ContractFunctionReturnType<UnitapPassMain['callStatic']['balanceOf']> | undefined
	>(undefined);

	const latestBlock = useBlockNumber();

	useEffect(() => {
		const f = async () => {
			if (!unitapPassContract || !address) return;
			Promise.all([unitapPassContract.balanceOf(address)]).then(([r1]) => setBalance(r1));
		};
		f();
	}, [unitapPassContract, address, latestBlock]);

	return { balance };
}
