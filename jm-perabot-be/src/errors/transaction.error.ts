import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'

export function TransactionTotalMismatch() {
  throw new ApiError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    "Transaction totals don't match",
    `Transaction provided has different total from the total calculated in front-end`,
  )
}
