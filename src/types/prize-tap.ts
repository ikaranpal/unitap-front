import { Chain, PK, Permission, UserProfile } from "."

export type Prize = {
  id: PK
  pk: PK
  constraints: Permission[]
  imageUrl: string
  tokenUri: string
  background: string
  creator: string
  creatorUrl: string
  contract: string
  isPrizeNft: boolean
  twitterUrl: string
  decimals: number
  discordUrl: string
  description: string
  createdAt: string
  deadline: string
  name: string
  creatorName?: string
  creatorProfile?: UserProfile
  chainName: string
  chainLogoUrl: string
  chain: Chain
  raffleId: string
  isClaimable: boolean
  isExpired: boolean
  userEntry: UserEntryInRaffle
  numberOfEntries: number
  numberOfOnchainEntries: number
  maxNumberOfEntries: number
  prizeAmount: number
  prizeName: string
  prizeSymbol: string
  winnerEntry: WinnerEntry
  startAt: string
  maxMultiplier: number
  prizeAsset?: string
}

export type WinnerEntry = {
  claimingPrizeTx: string
  createdAt: string
  multiplier: number
  pk: number
  raffle: userRaffle
  txHash: string
  userProfile: UserProfile
  wallet: string
}

export type EnrollPayload = {
  raffleId: number
  nonce: number
  signature: string
  method: string
}

export type EnrollmentRaffleApi = {
  detail: string
  signature: UserEntryInRaffle
}

export type EnrollmentSignature = {
  result: muonResult
}

type muonResult = {
  data: muonInit
  reqId: string
  signatures: muonSignature[]
  shieldSignature: string
}

type muonInit = {
  init: { nonceAddress: string }
}

type muonSignature = {
  owner: string
  signature: string
}

export type UserEntryInRaffle = {
  claimingPrizeTx: null | string
  createdAt: string
  multiplier: number
  pk: number
  raffle: userRaffle
  txHash: string | null
  userProfile: UserProfile
  wallet: string
}

type userRaffle = {
  contract: string
  name: string
  pk: number
  raffleId: number
}
