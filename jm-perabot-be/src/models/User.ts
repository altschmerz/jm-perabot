import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

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
}
