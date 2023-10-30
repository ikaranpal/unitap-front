import { PK } from "."

type UserWallet = {
  walletType: string
  pk: number
  address: string
}

export type UserProfile = {
  isMeetVerified: boolean
  isAuraVerified: boolean
  initial_context_id: string
  token: string
  pk: PK
  wallets: UserWallet[]
  username: string
}

export type Settings = {
  weeklyChainClaimLimit: number
  tokentapWeeklyClaimLimit: number
  prizetapWeeklyClaimLimit: number
  isGasTapAvailable: boolean
}

export enum BrightIdModalState {
  CLOSED,
  PROMPT,
  CREATE,
  LOGIN,
}

export type Permission = {
  id: PK
  name: string
  description: string
  resourcetype: string
  type: "TIME" | "VER"
  title?: string
}
