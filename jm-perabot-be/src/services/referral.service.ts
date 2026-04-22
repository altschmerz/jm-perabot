import Referral from '../models/Referral'
import { ReferralResource } from '../resources/referral.resource'
import BaseService from './BaseService'

export default class ReferralService extends BaseService {
  async getReferrals(): Promise<{
    referrals: ReferralResource[]
    count: number
  }> {
    const [referrals, count] = await Referral.findAndCount({
      relations: ['transaction', 'referrer'],
    })

    const referralRscs = referrals.map((referral) =>
      this.mapReferralResource(referral),
    )

    return { referrals: referralRscs, count }
  }
}
