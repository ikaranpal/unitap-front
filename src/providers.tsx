import { UserProfileProvider } from './hooks/useUserProfile';
import { RefreshContextProvider } from './context/RefreshContext';
import store from './state';
import { Provider } from 'react-redux';
import Web3Provider from 'components/Web3Provider';
import { BlockNumberProvider } from 'lib/hooks/useBlockNumber';
import { ErrorsProvider } from './context/ErrorsProvider';
import GlobalContextProvider from 'hooks/useGlobalContext';
import { FC, PropsWithChildren } from 'react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Provider store={store}>
			<Web3Provider>
				<RefreshContextProvider>
					<ErrorsProvider>
						<UserProfileProvider>
							<GlobalContextProvider>
								<BlockNumberProvider>{children}</BlockNumberProvider>
							</GlobalContextProvider>
						</UserProfileProvider>
					</ErrorsProvider>
				</RefreshContextProvider>
			</Web3Provider>
		</Provider>
	);
};
export default Providers;
