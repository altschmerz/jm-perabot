import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Product from './Product'

@Entity()
export default class Variant extends BaseEntity {
  @Column()
  name: string

  @Column()
  productId: number

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn()
  product: Product

  @Column({ default: 0 })
  stock: number
}
