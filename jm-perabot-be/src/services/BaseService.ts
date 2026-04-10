import Product from '../models/Product'
import User from '../models/User'
import AuthResource from '../resources/auth.resource'
import { SafeUserResource } from '../resources/safeUser.resource'
import { default as ShallowProductResource } from '../resources/shallowProduct.resource'

export default class BaseService {
  mapAuthResource(options: { id: number; token: string }): AuthResource {
    const authRsc = Object.assign(new AuthResource(), {
      id: options.id,
      token: options.token,
    })
    return authRsc
  }

  mapSafeUserResource(user: User): SafeUserResource {
    const safeUserRsc = Object.assign(new SafeUserResource(), {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      referralCode: user.referralCode,
    })
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
