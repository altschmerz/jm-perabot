import { Resource } from './Resource'

export class ReferralResource extends Resource {
  buyerName: string
  transactionDate: Date
  amount: number
  redeemed: boolean
}
