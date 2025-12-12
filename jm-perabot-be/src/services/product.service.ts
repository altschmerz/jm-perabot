import { FindManyOptions, FindOptionsWhere } from 'typeorm'
import {
  ProductAlreadyExistsError,
  ProductNotFoundError,
} from '../errors/product.error'
import Product from '../models/Product'
import BaseService from './BaseService'
import CategoryService from './category.service'
import VariantService from './variant.service'

const variantService = new VariantService()
const categoryService = new CategoryService()
export default class ProductService extends BaseService {
  async createProduct(options: {
    name: string
    sku: string
    description: string
    categoryId: number
    purchasePrice: number
    retailPrice: number
    wholesalerPrice: number
    totalStock: number
    variants?: VariantRequest[]
  }): Promise<Product> {
    await this.checkSkuUniqueness({ sku: options.sku })

    const category = await categoryService.getCategoryById({
      id: options.categoryId,
    })

    const product = new Product()
    product.name = options.name
    product.sku = options.sku
    product.description = options.description
    product.categoryId = category.id
    product.purchasePrice = options.purchasePrice
    product.retailPrice = options.retailPrice
    product.wholesalerPrice = options.wholesalerPrice
    product.totalStock = options.totalStock
    await product.save()

    if (options.variants) {
      for (const variant of options.variants) {
        await variantService.createVariant({
          productId: product.id,
          name: variant.name,
          stock: variant.stock,
        })
      }
    }

    const refetchedProduct = await Product.findOne({
      where: { id: product.id },
      relations: ['variants'],
    })

    return refetchedProduct
  }

  async getProducts(options: {
    page: number
    pageSize: number
    categoryId?: number
  }): Promise<{ products: Product[]; count: number }> {
    let findOptions: FindManyOptions<Product> = {
      take: options.pageSize,
      skip: options.page * options.pageSize,
    }

    let whereFilters: FindOptionsWhere<Product> = {}

    if (options.categoryId) whereFilters.categoryId = options.categoryId

    findOptions.where = whereFilters

    const [products, count] = await Product.findAndCount(findOptions)
    return { products, count }
  }

  async getProductById(options: { id: number }): Promise<Product> {
    const product = await Product.findOne({
      where: { id: options.id },
      relations: ['variants'],
    })
    if (!product) ProductNotFoundError({ attribute: 'ID', value: options.id })

    return product
  }

  async updateProduct(options: {
    id: number
    sku?: string
    name?: string
    description?: string
    purchasePrice?: number
    retailPrice?: number
    wholesalerPrice?: number
    totalStock?: number
  }): Promise<Product> {
    const product = await this.getProductById({ id: options.id })

    if (options.sku) {
      this.checkSkuUniqueness({ sku: options.sku })
      product.sku = options.sku
    }
    if (options.name) product.name = options.name
    if (options.description) product.description = options.description
    if (options.purchasePrice) product.purchasePrice = options.purchasePrice
    if (options.retailPrice) product.retailPrice = options.retailPrice
    if (options.wholesalerPrice)
      product.wholesalerPrice = options.wholesalerPrice
    if (options.totalStock) product.totalStock = options.totalStock

    await product.save()

    return product
  }

  async deleteProduct(options: { id: number }) {
    const product = await Product.findOne({
      where: { id: options.id },
      relations: ['variants'],
    })
    if (!product) ProductNotFoundError({ attribute: 'ID', value: options.id })

    if (product.variants) {
      for (const variant of product.variants) {
        await variant.remove()
      }
    }

    await product.remove()

    // ! BAD PRACTICE, SEE DELETE VARIANT SERVICE FUNCTION
    product.id = options.id
    return product
  }

  private async checkSkuUniqueness(options: { sku: string }): Promise<boolean> {
    const product = await Product.findOne({ where: { sku: options.sku } })
    if (product) ProductAlreadyExistsError()
    return true
  }
}
