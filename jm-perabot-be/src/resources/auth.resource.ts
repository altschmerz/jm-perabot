import { Resource } from './Resource'
import { SafeUserResource } from './safeUser.resource'

export default class AuthResource extends Resource {
  token: string
  user: SafeUserResource
}
