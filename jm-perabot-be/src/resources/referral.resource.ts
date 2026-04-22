import { ReferralStatusEnum } from '../models/Referral'
import Transaction from '../models/Transaction'
import { Resource } from './Resource'
import { SafeUserResource } from './safeUser.resource'

export class ReferralResource extends Resource {
  transaction: Transaction
  referrer: SafeUserResource
  amount: number
  redeemed: boolean
  status: ReferralStatusEnum
}
