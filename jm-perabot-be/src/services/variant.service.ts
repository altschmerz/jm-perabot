import { ILike } from 'typeorm'
import { ProductNotFoundError } from '../errors/product.error'
import {
  VariantAlreadyExistsError,
  VariantNotFoundError,
} from '../errors/variant.error'
import Product from '../models/Product'
import Variant from '../models/Variant'
import { supabase } from '../utils/supabase'
import BaseService from './BaseService'

export default class VariantService extends BaseService {
  /**
   * TODO:
   * This service currently doesn't check the productId. As it's only called by create product service as of now, the productId is guaranteed to be valid. We'll need to find a way to refactor this in the future
   */

  async createVariant(
    options: {
      productId: number
      name: string
      sku: string
      stock: number
    },
    image?: any
  ): Promise<Variant> {
    await this.checkVariantUniqueness({
      productId: options.productId,
      name: options.name,
    })

    const product = await Product.findOne({
      where: { id: options.productId },
    })
    if (!product)
      ProductNotFoundError({ attribute: 'ID', value: options.productId })

    const variant = new Variant()
    variant.name = options.name
    variant.sku = options.sku
    variant.stock = options.stock
    variant.productId = options.productId

    if (image) {
      const fileName = `var-${Date.now()}-${image.originalname}`

      await supabase.storage
        .from('product-images')
        .upload(fileName, image.buffer, { contentType: image.mimetype })

      const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`
      variant.imageUrl = imageUrl
    }

    await variant.save()

    return variant
  }

  async getVariants(options: { productId: number }) {
    const product = await Product.findOne({ where: { id: options.productId } })
    if (!product)
      ProductNotFoundError({ attribute: 'ID', value: options.productId })

    const [variants, count] = await Variant.findAndCount({
      where: { productId: options.productId },
    })

    return { variants, count }
  }

  async updateVariant(
    options: { id: number; name: string; sku: string; stock: number },
    image?: any
  ) {
    const variant = await Variant.findOne({ where: { id: options.id } })
    if (!variant) VariantNotFoundError({ id: options.id })

    if (
      options.name &&
      options.name.toLowerCase() !== variant.name.toLowerCase()
    ) {
      this.checkVariantUniqueness({
        productId: variant.productId,
        name: options.name,
      })
      variant.name = options.name
    }

    if (options.stock !== null) variant.stock = options.stock

    if (image) {
      const oldImageUrl = variant.imageUrl

      const newImageFileName = `var-${Date.now()}-${image.originalname}`

      await supabase.storage
        .from('product-images')
        .upload(newImageFileName, image.buffer, {
          contentType: image.mimetype,
        })

      if (oldImageUrl) {
        const oldImagePath = decodeURIComponent(
          oldImageUrl.split('/storage/v1/object/public/product-images/')[1]
        )

        if (oldImagePath) {
          await supabase.storage.from('product-images').remove([oldImagePath])
        }
      }

      const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/${newImageFileName}`
      variant.imageUrl = imageUrl
    }

    await variant.save()

    return variant
  }

  async deleteVariant(options: { id: number }) {
    const variant = await Variant.findOne({ where: { id: options.id } })
    if (!variant) VariantNotFoundError({ id: options.id })
    await variant.remove()

    // ! Oh god this is such a bad practice, get rid of this workaround, delete shouldn't return anything
    variant.id = options.id
    return variant
  }

  async checkVariantUniqueness(options: {
    productId: number
    name: string
  }): Promise<void> {
    const variant = await Variant.findOne({
      where: { productId: options.productId, name: ILike(options.name) },
    })
    if (variant) VariantAlreadyExistsError()
  }
}
