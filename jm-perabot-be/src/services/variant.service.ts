import { ProductNotFound } from '../errors/product.error'
import Product from '../models/Product'
import Variant from '../models/Variant'
import VariantOption from '../models/VariantOption'
import BaseService from './BaseService'

export default class VariantService extends BaseService {
  /**
   * TODO:
   * This service currently doesn't check the productId. As it's only called by create product service as of now, the productId is guaranteed to be valid. We'll need to find a way to refactor this in the future
   */

  async createVariant(options: {
    productId: number
    name: string
    variantOptions: VariantOptionRequest[]
  }): Promise<Variant> {
    await this.checkVariantUniqueness({
      productId: options.productId,
      name: options.name,
    })

    const product = await Product.findOne({
      where: { id: options.productId },
      relations: ['variants', 'variants.options'],
    })
    if (!product) ProductNotFound({ attribute: 'ID', value: options.productId })

    const variant = new Variant()
    variant.name = options.name
    variant.productId = options.productId
    await variant.save()

    for (const option of options.variantOptions) {
      const variantOption = new VariantOption()
      variantOption.name = option.name
      variantOption.stock = option.stock
      variantOption.variantId = variant.id
      await variantOption.save()
    }

    return variant
  }

  async checkVariantUniqueness(options: {
    productId: number
    name: string
  }): Promise<boolean> {
    const variant = await Variant.findOne({
      where: { productId: options.productId, name: options.name },
    })
    if (variant) return true
  }
}
