import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { array, number, object, string } from 'yup'
import convertTokenToUser from '../middlewares/auth/convertTokenToUser'
import verifyLoggedIn from '../middlewares/auth/verifyLoggedIn'
import { TransactionDeliveryStatusEnum } from '../models/Transaction'
import TransactionService from '../services/transaction.service'
import { transactionItemBodySchema } from '../ts/schemas/transactionItem.schema'
import { TransactionItemRequest } from '../ts/types/transactionItem.types'
import { wrapAsyncHandler } from '../utils/wrapAsyncHandler'

const transactionRouter = Router()
const transactionService = new TransactionService()

const TRANSACTION_DELIVERY_STATUS_ENUM_VALIDATION = Object.values(
  TransactionDeliveryStatusEnum,
).filter((value): value is number => typeof value === 'number')

transactionRouter.post(
  '/',
  convertTokenToUser,
  verifyLoggedIn,
  wrapAsyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      buyerName: string().required(),
      deliveryAddress: string().required(),
      buyerPhoneNumber: string().required(),
      total: number().required().min(0),
      transactionItems: array().of(transactionItemBodySchema).required().min(1),
      referrerCode: string().optional(),
      buyerId: number().optional(),
    })
    const body = bodySchema.validateSync(req.body)

    const transaction = await transactionService.createTransaction({
      buyerName: body.buyerName,
      deliveryAddress: body.deliveryAddress,
      buyerPhoneNumber: body.buyerPhoneNumber,
      total: body.total,
      transactionItems: body.transactionItems as TransactionItemRequest[],
      referrerCode: body.referrerCode,
      buyerId: body.buyerId,
    })
    res.sendJsonApiResource(StatusCodes.CREATED, transaction)
  }),
)

transactionRouter.get(
  '/',
  convertTokenToUser,
  verifyLoggedIn,
  wrapAsyncHandler(async (req, res) => {
    const { transactions, count } = await transactionService.getTransactions()
    res.sendJsonApiResource(StatusCodes.OK, transactions, count)
  }),
)

transactionRouter.get(
  '/:id',
  convertTokenToUser,
  verifyLoggedIn,
  wrapAsyncHandler(async (req, res) => {
    const transaction = await transactionService.getTransactionById({
      id: Number(req.params.id),
    })
    res.sendJsonApiResource(StatusCodes.OK, transaction)
  }),
)

transactionRouter.put(
  '/:id',
  convertTokenToUser,
  verifyLoggedIn,
  wrapAsyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      deliveryStatus: number()
        .oneOf(TRANSACTION_DELIVERY_STATUS_ENUM_VALIDATION)
        .required(),
    })
    const body = bodySchema.validateSync(req.body)

    const transaction = await transactionService.updateTransaction({
      id: Number(req.params.id),
      deliveryStatus: body.deliveryStatus,
    })
    res.sendJsonApiResource(StatusCodes.OK, transaction)
  }),
)

export default transactionRouter
