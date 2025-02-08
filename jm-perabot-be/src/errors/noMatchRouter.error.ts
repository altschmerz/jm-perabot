import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'

export function NoMatchRouterError() {
  throw new ApiError(
    StatusCodes.NOT_FOUND,
    'No Matched Router',
    'Url to requested resource does not exist.'
  )
}
