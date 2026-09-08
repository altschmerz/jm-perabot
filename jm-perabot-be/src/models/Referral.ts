import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Transaction from './Transaction'
import User from './User'

export enum ReferralStatusEnum {
  PENDING = 1,
  ELIGIBLE,
  CONFIRMED,
  CANCELLED,
}

@Entity('referral')
export default class Referral extends BaseEntity {
  @Column()
  transactionId: number

  @OneToOne(() => Transaction, (transaction) => transaction.referral)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction

  @Column()
  referrerId: number

  @ManyToOne(() => User, (user) => user.referrals)
  @JoinColumn({ name: 'referrerId' })
  referrer: User

  @Column()
  amount: number

  @Column({ default: false })
  redeemed: boolean

  @Column({
    type: 'enum',
    enum: ReferralStatusEnum,
    default: ReferralStatusEnum.PENDING,
  })
  status: ReferralStatusEnum
}
