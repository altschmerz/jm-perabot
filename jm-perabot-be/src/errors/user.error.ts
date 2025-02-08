import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'

export function UserNotFound(options: { attribute: string; value: any }) {
  throw new ApiError(
    StatusCodes.NOT_FOUND,
    'User not found',
    `User with ${options.attribute} ${options.value} is not found.`
  )
}

export function UserAlreadyExistsError(options: {
  attribute: string
  value: any
}) {
  throw new ApiError(
    StatusCodes.FORBIDDEN,
    'User already exists',
    `There already exists a user with ${options.attribute} ${options.value}`
  )
}
