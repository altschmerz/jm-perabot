import Product from '../models/Product'
import User from '../models/User'
import AuthResource from '../resources/auth.resource'
import ProductResource from '../resources/product.resource'
import { SafeUserResource } from '../resources/safeUser.resource'

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
      username: user.username,
      email: user.email,
      name: user.name,
    })
    return safeUserRsc
  }

  mapProductResource(product: Product): ProductResource {
    const productRsc = Object.assign(new ProductResource(), {
      id: product.id,
      sku: product.sku,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      retailPrice: product.retailPrice,
      wholesalerPrice: product.wholesalerPrice,
      totalStock: product.totalStock,
      variants: product.variants,
    })
    return productRsc
  }
}
