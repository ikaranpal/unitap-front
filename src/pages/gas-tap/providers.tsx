import { GasClaimProvider } from 'hooks/useChainList';
import { FC, PropsWithChildren } from 'react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return <GasClaimProvider>{children}</GasClaimProvider>;
};

export default Providers;
