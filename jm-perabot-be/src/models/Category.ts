import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Product from './Product'

@Entity('category')
export default class Category extends BaseEntity {
  @Column({ unique: true })
  name: string

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}
