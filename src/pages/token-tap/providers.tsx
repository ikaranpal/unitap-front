import TokenTapProvider from 'hooks/token-tap/tokenTapContext';
import { FC, PropsWithChildren } from 'react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return <TokenTapProvider>{children}</TokenTapProvider>;
};

export default Providers;
