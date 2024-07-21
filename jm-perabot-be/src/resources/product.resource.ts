import Variant from '../models/Variant'
import BaseResource from './BaseResource'

export default class ProductResource extends BaseResource {
  sku: string
  name: string
  description: string
  purchasePrice: number
  retailPrice: number
  wholesalerPrice: number
  totalStock: number
  variants?: Variant[]
}
