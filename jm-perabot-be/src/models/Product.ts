import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Variant from './Variant'

@Entity('product')
export default class Product extends BaseEntity {
  @Column({ unique: true })
  sku: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column()
  purchasePrice: number

  @Column()
  retailPrice: number

  @Column()
  wholesalerPrice: number

  @Column()
  totalStock: number

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[]
}
