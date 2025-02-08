import Variant from '../models/Variant'
import { Resource } from './Resource'

export default class ProductResource extends Resource {
  sku: string
  name: string
  description: string
  purchasePrice: number
  retailPrice: number
  wholesalerPrice: number
  totalStock: number
  variants?: Variant[]
}
