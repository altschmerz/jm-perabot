import jwt from 'jsonwebtoken'
import { UserNotFound } from '../errors/user.error'
import User from '../models/User'
import AuthUserResource from '../resources/authUser.resource'
import BaseService from './BaseService'

class AuthService extends BaseService {
  async createAuthUserResource(options: {
    id: number
  }): Promise<AuthUserResource> {
    const user = await User.findOne({ where: { id: options.id } })
    if (!user) UserNotFound({ attribute: 'ID', value: options.id })

    const token = this.generateAuthToken({
      body: { id: options.id.toString(), username: user.username },
    })
    user.accessToken = token
    await user.save()

    return this.mapAuthUserResource({ user, token })
  }

  async logout(options: { id: number }): Promise<void> {
    const user = await User.findOne({ where: { id: options.id } })
    if (!user) UserNotFound({ attribute: 'ID', value: options.id })

    user.accessToken = null
    await user.save()
  }

  generateAuthToken(options: { body: { [key: string]: string } }): string {
    return jwt.sign({ user: options.body }, process.env.SECRET_SIGNER)
  }
}

export default AuthService
