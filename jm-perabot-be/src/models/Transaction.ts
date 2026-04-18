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

export enum TransactionDeliveryStatusEnum {
  TO_BE_DELIVERED = 1,
  ON_DELIVERY,
  DELIVERED,
  SELF_PICK_UP,
}

export enum TransactionStatusEnum {
  PENDING = 1,
  COMPLETED,
  VOID,
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
  paymentStatus: TransactionPaymentStatusEnum

  @Column({
    type: 'enum',
    enum: TransactionDeliveryStatusEnum,
    default: TransactionDeliveryStatusEnum.TO_BE_DELIVERED,
  })
  deliveryStatus: TransactionDeliveryStatusEnum

  @Column({
    type: 'enum',
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.PENDING,
  })
  status: TransactionStatusEnum

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.transaction,
  )
  transactionItems: TransactionItem[]
}
