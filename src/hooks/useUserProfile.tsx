import React, {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {
	checkUsernameAPI,
	getRemainingClaimsAPI,
	getUserProfile,
	getUserProfileWithTokenAPI,
	getWeeklyChainClaimLimitAPI, setUsernameAPI,
	setWalletAPI
} from "api";
import {APIErrorsSource, UserProfile} from "types";
import useToken from "./useToken";
import {useWeb3React} from "@web3-react/core";
import {RefreshContext} from "context/RefreshContext";
import {AxiosError} from "axios";
import {ErrorsMessagesContext} from "../context/ErrorsMessagesProvider";

export const UserProfileContext = createContext<{
	userProfile: UserProfile | null;
	refreshUserProfile: ((address: string, signature: string) => Promise<void>) | null;
	loading: boolean;
	weeklyChainClaimLimit: number | null;
	remainingClaims: number | null;
	userProfileLoading: boolean;
	nonEVMWalletAddress: string;
	setNonEVMWalletAddress: (address: string) => void;
	isUserProfileModalOpen: boolean;
	setIsUserProfileModalOpenState: (state: boolean) => void;
	checkUsername: (username: string) => Promise<void>;
	setUsername: (username: string) => Promise<void>;
}>({
	userProfile: null,
	refreshUserProfile: null,
	loading: false,
	weeklyChainClaimLimit: null,
	remainingClaims: null,
	userProfileLoading: false,
	nonEVMWalletAddress: "",
	setNonEVMWalletAddress: () => {
	},
	isUserProfileModalOpen: false,
	setIsUserProfileModalOpenState: () => {
	},
	checkUsername: () => Promise.resolve(),
	setUsername: () => Promise.resolve(),
});

export function UserProfileProvider({children}: PropsWithChildren<{}>) {
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(false);
	const [userToken, setToken] = useToken();
	const [weeklyChainClaimLimit, setWeeklyChainClaimLimit] = useState<number | null>(null);
	const [remainingClaims, setRemainingClaims] = useState<number | null>(null);
	const {addError, addMessage, deleteMessage, deleteError} = useContext(ErrorsMessagesContext);
	const [userProfileLoading, setUserProfileLoading] = useState(false);
	const [nonEVMWalletAddress, setNonEVMWalletAddress] = useState("");

	const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState<boolean>(true);

	const setIsUserProfileModalOpenState = (state: boolean) => {
		setIsUserProfileModalOpen(state);
	}

	const {fastRefresh} = useContext(RefreshContext);

	const {account} = useWeb3React();

	const setNewUserProfile = useCallback((newUserProfile: UserProfile) => {
		setUserProfile(newUserProfile);
	}, []);

	const refreshUserProfile = async (address: string, signature: string) => {
		setLoading(true);
		getUserProfile(address, signature).then((refreshedUserProfile: UserProfile) => {
			setNewUserProfile(refreshedUserProfile);
			setToken(refreshedUserProfile.token);
			setLoading(false);
			return refreshedUserProfile;
		}).catch((ex: AxiosError) => {
			setLoading(false);
			if (ex.response?.status === 403 || ex.response?.status === 409) {
				addError({
					source: APIErrorsSource.BRIGHTID_CONNECTION_ERROR,
					message: ex.response.data.message,
					statusCode: ex.response.status
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
			const newWeeklyChainClaimLimit: number = await getWeeklyChainClaimLimitAPI(userToken!);
			setWeeklyChainClaimLimit(newWeeklyChainClaimLimit);
		};

		const getRemainingClaims = async () => {
			const newRemainingClaims = await getRemainingClaimsAPI(userToken!);
			setRemainingClaims(newRemainingClaims.totalWeeklyClaimsRemaining);
		};

		if (userToken && userProfile) {
			getWeeklyChainClaimLimit();
			getRemainingClaims();
		} else {
			setWeeklyChainClaimLimit(null);
			setRemainingClaims(null);
		}
	}, [userProfile, userToken, fastRefresh]);

	useEffect(() => {
		if (account && userToken) {
			setWalletAPI(userToken, account, "EVM");
		}
	}, [account, userToken]);

	const checkUsername = async (username: string) => {
		if (!userProfile || !userProfile.token) return;

		setLoading(true);
		checkUsernameAPI(userProfile.token, username).then((res) => {
			setLoading(false);
			addMessage({
				source: APIErrorsSource.USER_PROFILE_ERROR,
				message: res.message,
				statusCode: res.status
			})
			return res;
		}).catch((ex: AxiosError) => {
			setLoading(false);
			if (ex.response?.status === 400 || ex.response?.status === 403) {
				addError({
					source: APIErrorsSource.USER_PROFILE_ERROR,
					message: ex.response.data.message,
					statusCode: ex.response.status
				});
			}
			throw ex;
		});
	}

	const setUsername = async (username: string) => {
		if (!userProfile || !userProfile.token) return;

		setLoading(true);
		setUsernameAPI(userProfile.token, username).then((res) => {
			setLoading(false);
			deleteMessage(APIErrorsSource.USER_PROFILE_ERROR);
			deleteError(APIErrorsSource.USER_PROFILE_ERROR);
			setIsUserProfileModalOpen(false);
			return res;
		}).catch((ex: AxiosError) => {
			setLoading(false);
			if (ex.response?.status === 400 || ex.response?.status === 403) {
				addError({
					source: APIErrorsSource.USER_PROFILE_ERROR,
					message: ex.response.data.message,
					statusCode: ex.response.status
				});
			}
			throw ex;
		});
	}

	return (
		<UserProfileContext.Provider
			value={{
				userProfile,
				refreshUserProfile,
				loading,
				weeklyChainClaimLimit,
				remainingClaims,
				userProfileLoading,
				nonEVMWalletAddress,
				setNonEVMWalletAddress,
				isUserProfileModalOpen,
				setIsUserProfileModalOpenState,
				checkUsername,
				setUsername
			}}>
			{children}
		</UserProfileContext.Provider>
	);
}
