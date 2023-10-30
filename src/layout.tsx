import Navbar from 'components/containers/common/Navbar/navbar';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default Layout;
