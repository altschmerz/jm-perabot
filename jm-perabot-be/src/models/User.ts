import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import Transaction from './Transaction'

export enum UserRoleTypeId {
  Normal = 1,
  Admin,
}
@Entity()
export default class User extends BaseEntity {
  @Column({ unique: true })
  username: string

  @Column()
  passwordHash: string

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  phoneNumber: string

  @Column()
  address: string

  @Column({ nullable: true })
  referralCode: string

  @Column({ nullable: true })
  accessToken: string

  @Column({
    type: 'enum',
    enum: UserRoleTypeId,
    default: UserRoleTypeId.Normal,
  })
  roleTypeId: UserRoleTypeId

  @OneToMany(() => Transaction, (transaction) => transaction.buyer)
  transactions: Transaction[]
}
