import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'

export function ProductNotFoundError(options: {
  attribute: string
  value: any
}) {
  throw new ApiError(
    StatusCodes.NOT_FOUND,
    'Product not found',
    `Product with ${options.attribute} ${options.value} is not found.`
  )
}

export function ProductAlreadyExistsError() {
  throw new ApiError(
    StatusCodes.FORBIDDEN,
    'Product already exists',
    'There already exists a product with this SKU'
  )
}
