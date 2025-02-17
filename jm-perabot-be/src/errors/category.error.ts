import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'

export function CategoryNotFoundError(options: {
  attribute: string
  value: any
}) {
  throw new ApiError(
    StatusCodes.NOT_FOUND,
    'Category not found',
    `Category with ${options.attribute} ${options.value} is not found.`
  )
}

export function CategoryAlreadyExistsError() {
  throw new ApiError(
    StatusCodes.FORBIDDEN,
    'Category already exists',
    'There already exists a category with this name'
  )
}
