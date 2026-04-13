import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'

export function TransactionItemTotalMismatch() {
  throw new ApiError(
    StatusCodes.UNPROCESSABLE_ENTITY,
    "Transaction item totals don't match",
    `Transaction item provided has different total from the total calculated in front-end`,
  )
}
