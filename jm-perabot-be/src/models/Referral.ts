import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Transaction from './Transaction'
import User from './User'

@Entity('referral')
export default class Referral extends BaseEntity {
  @Column()
  transactionId: number

  @OneToOne(() => Transaction)
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
}
