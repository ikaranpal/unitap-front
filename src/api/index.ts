import {
	Chain,
	ClaimReceipt,
	UserProfile,
	Token,
	ClaimedToken,
	ClaimTokenResponse,
	Settings,
	Prize,
	EnrollmentSignature,
	EnrollmentRaffleApi,
} from 'types';
import axios from 'axios';
import { getLastMonday } from 'utils';

const axiosInstance = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL,
});

export async function getChainList() {
	const response = await axiosInstance.get<Chain[]>('/api/v1/chain/list/');
	return response.data;
}

export async function getUserProfile(address: string, signature: string) {
	const response = await axiosInstance.post<UserProfile>(`/api/auth/user/login/`, {
		username: address,
		password: signature,
	});
	return response.data;
}

export async function createUserProfile(address: string) {
	const response = await axiosInstance.post<UserProfile>(`/api/v1/user/create/`, { address });
	return response.data;
}

export async function claimMax(token: string, chainPk: number) {
	const response = await axiosInstance.post<ClaimReceipt>(`/api/v1/chain/${chainPk}/claim-max/`, null, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
	return response.data;
}

export async function claimMaxNonEVMAPI(token: string, chainPk: number, address: string) {
	const response = await axiosInstance.post<ClaimReceipt>(
		`/api/v1/chain/${chainPk}/claim-max/`,
		{ address: address },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	);
	return response.data;
}

export async function getActiveClaimHistory(token: string) {
	const date = new Date();
	const lastMonday = getLastMonday(date).toISOString();
	const response = await axiosInstance.get<ClaimReceipt[]>('/api/v1/user/claims/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

	return response.data.filter((claim) => claim.datetime >= lastMonday).sort((b, a) => a.pk - b.pk);
}

export async function getUserProfileWithTokenAPI(token: string) {
	const response = await axiosInstance.get<UserProfile>(`/api/auth/user/info/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
	return response.data;
}

export async function getWeeklyChainClaimLimitAPI() {
	const response = await axiosInstance.get<Settings>('/api/v1/settings/');
	return response.data;
}

export async function getRemainingClaimsAPI(token: string) {
	const response = await axiosInstance.get('/api/v1/user/remainig-claims/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
	return response.data;
}

export async function setWalletAPI(token: string, wallet: string, walletType: string) {
	const response = await axiosInstance.post(
		'/api/auth/user/set-wallet/',
		{ walletType: walletType, address: wallet },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	);
	return response.data;
}

export async function sponsorAPI(address: string) {
	const response = await axiosInstance.post('/api/auth/user/sponsor/', { address: address });
	return response.data;
}

export async function getTokensListAPI() {
	const response = await axiosInstance.get<Token[]>('/api/tokentap/token-distribution-list/');
	return response.data;
}

export async function getClaimedTokensListAPI(token: string) {
	const response = await axiosInstance.get<ClaimedToken[]>('/api/tokentap/claims-list/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
	return response.data;
}

export async function claimTokenAPI(token: string, tokenId: number, body?: any) {
	const response = await axiosInstance.post<ClaimTokenResponse>(
		`/api/tokentap/token-distribution/${tokenId}/claim/`,
		body ?? {},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	);
	return response.data.signature;
}

export async function countUsersAPI() {
	const response = await axiosInstance.get<{ count: number }>('/api/auth/user/count/');

	return response.data.count;
}

export async function countGasClaimedAPI() {
	const response = await axiosInstance.get<{ count: number }>('/api/v1/claims/count/');

	return response.data.count;
}

export async function updateClaimFinished(token: string, claimId: number, txHash: string) {
	const response = await axiosInstance.post<any>(
		`/api/tokentap/claims-list/${claimId}/update/`,
		{ txHash },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	);
	return response.data;
}

export async function getRafflesListAPI(token: string | undefined) {
	if (token) {
		const response = await axiosInstance.get<Prize[]>('/api/prizetap/raffle-list/', {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return response.data;
	}
	const response = await axiosInstance.get<Prize[]>('/api/prizetap/raffle-list/');
	return response.data;
}

export async function updateEnrolledFinished(token: string, raffleID: number | undefined, txHash: string) {
	const response = await axiosInstance.post<any>(
		`api/prizetap/set-enrollment-tx/${raffleID}/`,
		{ txHash },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	);
	return response.data;
}

export async function updateClaimPrizeFinished(token: string, raffleID: number | undefined, txHash: string) {
	const response = await axiosInstance.post<any>(
		`api/prizetap/set-claiming-prize-tx/${raffleID}/`,
		{ txHash },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	);
	return response.data;
}

export async function getEnrollmentApi(token: string, raffleID: number) {
	const response = await axiosInstance.post<EnrollmentRaffleApi>(`/api/prizetap/raffle-enrollment/${raffleID}/`, null, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
	return response.data;
}

export async function getMuonApi(raffleEntryId: number) {
	const response = await axios.post<EnrollmentSignature>(
		`https://shield.unitap.app/v1/?app=unitap&method=raffle-entry&params[raffleEntryId]=${raffleEntryId}`,
		null,
	);
	return response.data;
}

export async function submitDonationTxHash(txHash: string, chainPk: number, token: string) {
	const response = await axiosInstance.post(
		'/api/v1/user/donation',
		{
			txHash,
			chainPk,
		},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	);

	return response.data;
}

export async function getRaffleConstraintsVerifications(rafflePk: number, token: string) {
	const response = await axiosInstance.get('/api/prizetap/get-raffle-constraints/' + rafflePk + '/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

	return response.data;
}

export async function getUserRaffles(token: string) {
	const response = await axiosInstance.get(`/api/prizetap/get-user-raffles/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
	return response.data;
}


export async function getProviderDashboardValidChain() {
	const response = await axiosInstance.get(`/api/prizetap/get-valid-chains/`);
	return response.data.data;
}


export async function updateCreateRaffleTx(token: string, raffleID: number | undefined, txHash: string) {
	const response = await axiosInstance.post<any>(
		`api/prizetap/set-raffle-tx/<int:pk>/`,
		{ txHash },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	);
	return response.data;
}

export async function  getConstraintsApi () {
	const response = await axiosInstance.get(`/api/prizetap/get-constraints/`);
	console.log(response.data)
	return response.data;
}

export async function createRaffleApi(token: string, raffleData: any) {
	const response = await axiosInstance.post<any>(
		`/api/prizetap/create-raffle/`,
		raffleData,
		{
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			}
		}
	)
	console.log(response.data)
	return response.data
}

// '{"name":"test", "description": "The first raffle","contract":"0x5363502325735d7b27162b2b3482c107fD4c5B3C", "creator_name":"Shayan", "creator_address":"0xb57490CDAABEDb450df33EfCdd93079A24ac5Ce5", "prize_amount":"100000000", "prize_asset":"0x0000000000000000000000000000000000000000", "prize_name":"1 ETH", "prize_symbol":"ETH", "decimals": 6, "chain": 1, "constraints": [1, 3], "constraint_params": "eyJIYXZlVW5pdGFwUGFzcyI6eyJDSEFJTiI6IDF9fQ==", "deadline":"2023-09-25 21:00", "max_number_of_entries": 10, "start_at": "2023-09-25 10:00" }'