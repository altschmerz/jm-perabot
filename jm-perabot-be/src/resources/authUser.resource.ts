import { UserRoleTypeId } from '../models/User'
import { Resource } from './Resource'
import { SafeUserResource } from './safeUser.resource'

export default class AuthUserResource extends Resource {
  token: string
  user: SafeUserResource
  role: UserRoleTypeId
}
