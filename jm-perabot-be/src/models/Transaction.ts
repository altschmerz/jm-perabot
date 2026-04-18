import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Referral from './Referral'
import TransactionItem from './TransactionItem'
import User from './User'

export enum TransactionPaymentStatusEnum {
  UNPAID = 1,
  DOWN_PAYMENT,
  PAID,
}

@Entity('transaction')
export default class Transaction extends BaseEntity {
  @Column()
  @Generated('uuid')
  code: string

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

  @Column({ nullable: true })
  referralId?: number

  @OneToOne(() => Referral)
  @JoinColumn({ name: 'referralId' })
  referral?: Referral

  @Column({
    type: 'enum',
    enum: TransactionPaymentStatusEnum,
    default: TransactionPaymentStatusEnum.UNPAID,
  })
  paymentStatus?: TransactionPaymentStatusEnum

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.transaction,
  )
  transactionItems: TransactionItem[]
}
