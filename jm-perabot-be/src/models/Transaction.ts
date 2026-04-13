import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import TransactionItem from './TransactionItem'
import User from './User'

@Entity('transaction')
export default class Transaction extends BaseEntity {
  @Column()
  buyerName: string

  @Column()
  deliveryAddress: string

  @Column()
  buyerPhoneNumber: string

  @Column({ nullable: true })
  buyerId: number

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'buyerId' })
  buyer: User

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date

  @Column()
  total: number

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.transaction,
  )
  transactionItems: TransactionItem[]
}
