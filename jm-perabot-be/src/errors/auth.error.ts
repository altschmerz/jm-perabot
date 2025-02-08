import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'

export function IncorrectPasswordError() {
  throw new ApiError(
    StatusCodes.UNAUTHORIZED,
    'Incorrect password',
    'The password provided is incorrect'
  )
}

export function UnauthorizedAccessError() {
  throw new ApiError(
    StatusCodes.UNAUTHORIZED,
    'Unauthorized access',
    'You are trying to access a secured route'
  )
}
