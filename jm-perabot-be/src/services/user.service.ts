import bcrypt from 'bcrypt'
import { FindOptionsWhere, ILike } from 'typeorm'
import {
  IncorrectPasswordError,
  UnauthorizedAccessError,
} from '../errors/auth.error'
import { UserAlreadyExistsError, UserNotFound } from '../errors/user.error'
import User, { UserRoleTypeId } from '../models/User'
import { SafeUserResource } from '../resources/safeUser.resource'
import hashPassword from '../utils/hashPassword'
import BaseService from './BaseService'

export default class UserService extends BaseService {
  async createUser(options: {
    username: string
    password: string
    email: string
    name: string
    phoneNumber: string
    address: string
    referralCode?: string
  }): Promise<SafeUserResource> {
    await this.checkAttributeUniqueness({
      attribute: 'username',
      value: options.username,
    })
    await this.checkAttributeUniqueness({
      attribute: 'email',
      value: options.email,
    })

    const user = new User()
    user.username = options.username
    user.passwordHash = await hashPassword(options.password)
    user.email = options.email
    user.name = options.name
    user.phoneNumber = options.phoneNumber
    user.address = options.address

    if (options.referralCode) user.referralCode = options.referralCode

    await user.save()

    return this.mapSafeUserResource(user)
  }

  async getUsers(options: {
    search?: string
  }): Promise<{ users: SafeUserResource[]; count: number }> {
    const [users, count] = await User.findAndCount({
      where: options.search
        ? [
            { name: ILike(`%${options.search}%`) },
            { username: ILike(`%${options.search}%`) },
          ]
        : {},
    })
    const userRscs = users.map((user) => this.mapSafeUserResource(user))
    return { users: userRscs, count }
  }

  async assignUserReferralCode(options: {
    username: string
    referralCode: string
  }) {
    const user = await User.findOne({ where: { username: options.username } })
    if (!user) UserNotFound({ attribute: 'username', value: options.username })

    if (user.referralCode !== options.referralCode)
      await this.checkAttributeUniqueness({
        attribute: 'referral code',
        value: options.referralCode,
      })

    user.referralCode = options.referralCode
    await user.save()

    return user
  }

  async getUserById(options: {
    id: number
    safeUser: boolean
    reqUserId?: number
  }): Promise<SafeUserResource | User> {
    if (!options.safeUser && options.id !== options.reqUserId) {
      const currentUser = await User.findOne({
        where: { id: options.reqUserId },
      })
      if (!currentUser)
        UserNotFound({ attribute: 'ID', value: options.reqUserId })
      if (currentUser.roleTypeId !== UserRoleTypeId.Admin)
        UnauthorizedAccessError()
    }
    const user = await User.findOne({ where: { id: options.id } })
    if (!user) UserNotFound({ attribute: 'ID', value: options.id })

    return options.safeUser ? this.mapSafeUserResource(user) : user
  }

  async updateUser(options: {
    id: number
    username?: string
    email?: string
    name?: string
    phoneNumber?: string
    address?: string
  }): Promise<SafeUserResource> {
    const user = await User.findOne({ where: { id: options.id } })
    if (!user) UserNotFound({ attribute: 'ID', value: options.id })

    if (options.username && options.username !== user.username) {
      await this.checkAttributeUniqueness({
        attribute: 'username',
        value: options.username,
      })
      user.username = options.username
    }

    if (options.email && options.email !== user.email) {
      await this.checkAttributeUniqueness({
        attribute: 'email',
        value: options.email,
      })
      user.email = options.email
    }

    if (options.name) user.name = options.name
    if (options.phoneNumber) user.phoneNumber = options.phoneNumber
    if (options.address) user.address = options.address

    await user.save()
    return this.mapSafeUserResource(user)
  }

  async changePassword(options: {
    id: number
    oldPassword: string
    newPassword: string
  }): Promise<void> {
    const user = await User.findOne({ where: { id: options.id } })
    if (!user) UserNotFound({ attribute: 'ID', value: options.id })

    const isPasswordCorrect = await bcrypt.compare(
      options.oldPassword,
      user.passwordHash,
    )
    if (!isPasswordCorrect) IncorrectPasswordError()

    user.passwordHash = await hashPassword(options.newPassword)
    await user.save()
  }

  async checkAttributeUniqueness(options: {
    attribute: 'username' | 'email' | 'referral code'
    value: string
  }): Promise<boolean> {
    const whereFilter: FindOptionsWhere<User> = {}
    switch (options.attribute) {
      case 'email':
        whereFilter.email = options.value
        break
      case 'username':
        whereFilter.username = options.value
        break
      case 'referral code':
        whereFilter.referralCode = options.value
        break
      default:
    }

    const user = await User.findOne({ where: whereFilter })
    if (user)
      UserAlreadyExistsError({
        attribute: options.attribute,
        value: options.value,
      })

    return true
  }
}
