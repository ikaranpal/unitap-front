import PrizeTapProvider from 'hooks/prizeTap/prizeTapContext';
import { FC, PropsWithChildren } from 'react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return <PrizeTapProvider>{children}</PrizeTapProvider>;
};

export default Providers;
