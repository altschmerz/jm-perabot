import Variant from '../models/Variant'
import { Resource } from './Resource'

export default class ShallowProductResource extends Resource {
  sku: string
  name: string
  description: string
  imageUrl: string
  variants?: Variant[]
}
