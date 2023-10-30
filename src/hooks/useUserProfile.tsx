import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import {
	getRemainingClaimsAPI,
	getUserProfile,
	getUserProfileWithTokenAPI,
	getWeeklyChainClaimLimitAPI,
	setWalletAPI,
} from 'api';
import { APIErrorsSource, Settings, UserProfile } from 'types';
import useToken from './useToken';
import { RefreshContext } from 'context/RefreshContext';
import { AxiosError } from 'axios';
import { ErrorsContext } from '../context/ErrorsProvider';
import { useWalletAccount } from 'utils/hook/wallet';

export const UserProfileContext = createContext<
	Partial<Settings> & {
		userProfile: UserProfile | null;
		refreshUserProfile: ((address: string, signature: string) => Promise<void>) | null;
		loading: boolean;
		remainingClaims: number | null;
		userProfileLoading: boolean;
		nonEVMWalletAddress: string;
		setNonEVMWalletAddress: (address: string) => void;
		userToken: string | null;
		isGasTapAvailable: boolean;
	}
>({
	userProfile: null,
	isGasTapAvailable: true,
	refreshUserProfile: null,
	loading: false,
	tokentapRoundClaimLimit: 0,
	gastapRoundClaimLimit: 0,
	remainingClaims: null,
	userProfileLoading: false,
	nonEVMWalletAddress: '',
	userToken: null,
	setNonEVMWalletAddress: () => {},
});

export const useUserProfileContext = () => useContext(UserProfileContext);

export function UserProfileProvider({ children }: PropsWithChildren<{}>) {
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(false);
	const [userToken, setToken] = useToken();
	const [weeklyClaimSettings, setWeeklyClaimSettings] = useState<Settings>({
		gastapRoundClaimLimit: 0,
		tokentapRoundClaimLimit: 0,
		prizetapRoundClaimLimit: 0,
		isGasTapAvailable: false,
	});

	const [remainingClaims, setRemainingClaims] = useState<number | null>(null);
	const { addError } = useContext(ErrorsContext);
	const [userProfileLoading, setUserProfileLoading] = useState(false);
	const [nonEVMWalletAddress, setNonEVMWalletAddress] = useState('');

	const { fastRefresh } = useContext(RefreshContext);

	const { address } = useWalletAccount();

	const setNewUserProfile = useCallback((newUserProfile: UserProfile) => {
		setUserProfile(newUserProfile);
	}, []);

	const refreshUserProfile = async (address: string, signature: string) => {
		setLoading(true);
		getUserProfile(address, signature)
			.then((refreshedUserProfile: UserProfile) => {
				setNewUserProfile(refreshedUserProfile);
				setToken(refreshedUserProfile.token);
				setLoading(false);
				return refreshedUserProfile;
			})
			.catch((ex: AxiosError) => {
				setLoading(false);
				if (ex.response?.status === 403 || ex.response?.status === 409) {
					addError({
						source: APIErrorsSource.BRIGHTID_CONNECTION_ERROR,
						message: ex.response.data.message,
						statusCode: ex.response.status,
					});
				}
				throw ex;
			});
	};

	useEffect(() => {
		const getUserProfileWithToken = async () => {
			setUserProfileLoading(true);
			try {
				const userProfileWithToken: UserProfile = await getUserProfileWithTokenAPI(userToken!);
				setNewUserProfile(userProfileWithToken);
				setUserProfileLoading(false);
			} catch (ex) {
				setUserProfileLoading(false);
				throw ex;
			}
		};

		if (userToken && !userProfile) {
			getUserProfileWithToken();
		}
	}, [userToken, userProfile, setNewUserProfile]);

	useEffect(() => {
		const getWeeklyChainClaimLimit = async () => {
			const res = await getWeeklyChainClaimLimitAPI();
			setWeeklyClaimSettings(res);
		};

		const getRemainingClaims = async () => {
			const newRemainingClaims = await getRemainingClaimsAPI(userToken!);
			setRemainingClaims(newRemainingClaims.totalRoundClaimsRemaining);
		};

		getWeeklyChainClaimLimit();
		if (userToken && userProfile) {
			getRemainingClaims();
		} else {
			// setWeeklyChainClaimLimit(null);
			setRemainingClaims(null);
		}
	}, [userProfile, userToken, fastRefresh]);

	useEffect(() => {
		if (address && userToken) {
			setWalletAPI(userToken, address, 'EVM');
		}
	}, [address, userToken]);

	return (
		<UserProfileContext.Provider
			value={{
				userProfile,
				isGasTapAvailable: weeklyClaimSettings.isGasTapAvailable,
				refreshUserProfile,
				loading,
				gastapRoundClaimLimit: weeklyClaimSettings.gastapRoundClaimLimit,
				tokentapRoundClaimLimit: weeklyClaimSettings.tokentapRoundClaimLimit,
				prizetapRoundClaimLimit: weeklyClaimSettings.prizetapRoundClaimLimit,
				userToken,
				remainingClaims,
				userProfileLoading,
				nonEVMWalletAddress,
				setNonEVMWalletAddress,
			}}
		>
			{children}
		</UserProfileContext.Provider>
	);
}
