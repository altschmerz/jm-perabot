import { Resource } from './Resource'

export class UserReferralResource extends Resource {
  buyerName: string
  transactionDate: Date
  amount: number
  redeemed: boolean
}
