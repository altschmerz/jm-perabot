import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Category from './Category'
import Variant from './Variant'

@Entity('product')
export default class Product extends BaseEntity {
  @Column({ unique: true })
  sku: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  imageUrl: string

  @Column()
  purchasePrice: number

  @Column()
  retailPrice: number

  @Column()
  wholesalerPrice: number

  @Column()
  totalStock: number

  @Column()
  categoryId: number

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[]
}
