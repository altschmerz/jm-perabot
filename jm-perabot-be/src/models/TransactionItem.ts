import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Transaction from './Transaction'

@Entity('transaction_item')
export default class TransactionItem extends BaseEntity {
  @Column()
  name: string

  @Column({ nullable: true })
  note?: string

  @Column()
  quantity: number

  @Column()
  price: number

  @Column()
  total: number

  @Column({ default: false })
  eligibleForReferral: boolean

  @Column()
  transactionId: number

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionItems)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction
}
