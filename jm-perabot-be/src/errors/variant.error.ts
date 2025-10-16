import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'

export function VariantAlreadyExistsError() {
  throw new ApiError(
    StatusCodes.FORBIDDEN,
    'Variant already exists',
    'There already exists a variant with this name associated with this product'
  )
}

export function VariantNotFoundError(options: { id: number }) {
  throw new ApiError(
    StatusCodes.NOT_FOUND,
    'Variant not found',
    `Variant with ID ${options.id} not found`
  )
}
