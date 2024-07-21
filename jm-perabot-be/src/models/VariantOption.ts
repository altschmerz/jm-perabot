import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Variant from './Variant'

@Entity()
export default class VariantOption extends BaseEntity {
  @Column()
  variantId: number

  @ManyToOne(() => Variant, (variant) => variant.options)
  @JoinColumn({ name: 'variantId' })
  variant: Variant

  @Column()
  name: string

  @Column()
  stock: number
}
