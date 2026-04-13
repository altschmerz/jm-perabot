import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Transaction from './Transaction'

@Entity('category')
export default class TransactionItem extends BaseEntity {
  @Column()
  itemName: string

  @Column()
  note: string

  @Column()
  quantity: number

  @Column()
  price: number

  @Column()
  total: number

  @Column()
  transactionId: number

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionItems)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction
}
