import Product from '../models/Product'
import Referral from '../models/Referral'
import User from '../models/User'
import AuthUserResource from '../resources/authUser.resource'
import { SafeUserResource } from '../resources/safeUser.resource'
import { default as ShallowProductResource } from '../resources/shallowProduct.resource'
import { UserReferralResource } from '../resources/userReferral.resource'

export default class BaseService {
  mapAuthUserResource(options: {
    user: User
    token: string
  }): AuthUserResource {
    const authRsc = Object.assign(new AuthUserResource(), {
      id: options.user?.id,
      token: options.token,
      safeUser: this.mapSafeUserResource(options.user),
      role: options.user.roleTypeId,
    })
    return authRsc
  }

  mapUserReferralResource(referral: Referral): UserReferralResource {
    const referralRsc = Object.assign(new UserReferralResource(), {
      id: referral.id.toString(),
      transactionDate: referral.transaction?.date,
      buyerName: referral.transaction.buyerName,
      amount: referral.amount,
      redeemed: referral.redeemed,
    } as UserReferralResource)
    return referralRsc
  }

  mapSafeUserResource(user: User): SafeUserResource {
    const safeUserRsc = Object.assign(new SafeUserResource(), {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      referralCode: user.referralCode,
    } as SafeUserResource)
    return safeUserRsc
  }

  mapShallowProductResource(product: Product): ShallowProductResource {
    const shallowProductRsc = Object.assign(new ShallowProductResource(), {
      id: product.id,
      sku: product.sku,
      name: product.name,
      imageUrl: product.imageUrl,
      description: product.description,
      variants: product.variants,
    })
    return shallowProductRsc
  }
}
