import {
  TransactionNotFound,
  TransactionTotalMismatch,
} from '../errors/transaction.error'
import { TransactionItemTotalMismatch } from '../errors/transactionItem.error'
import { UserNotFound } from '../errors/user.error'
import Referral from '../models/Referral'
import Transaction from '../models/Transaction'
import TransactionItem from '../models/TransactionItem'
import User from '../models/User'
import { TransactionItemRequest } from '../ts/types/transactionItem.types'
import BaseService from './BaseService'

const MAX_REFERRAL_AMOUNT_PER_TRX = 500000
export default class TransactionService extends BaseService {
  async createTransaction(options: {
    buyerName: string
    deliveryAddress: string
    buyerPhoneNumber: string
    total: number
    transactionItems: TransactionItemRequest[]
    buyerId?: number
    referrerCode?: string
  }): Promise<Transaction> {
    const transactionTotal = options.transactionItems.reduce(
      (acc, item) => acc + item.total,
      0,
    )
    if (transactionTotal !== options.total) TransactionTotalMismatch()

    const transactionItems = options.transactionItems.map((item) => {
      const transactionItemTotal = item.quantity * item.price
      if (transactionItemTotal !== item.total) TransactionItemTotalMismatch()

      const transactionItem = new TransactionItem()
      transactionItem.name = item.name
      transactionItem.note = item.note
      transactionItem.quantity = item.quantity
      transactionItem.price = item.price
      transactionItem.total = transactionItemTotal
      return transactionItem
    })

    let referrer: User | null
    if (options.referrerCode) {
      referrer = await User.findOne({
        where: { referralCode: options.referrerCode },
      })
      if (!referrer)
        UserNotFound({ attribute: 'kode referal', value: options.referrerCode })
    }

    const transaction = new Transaction()
    transaction.buyerName = options.buyerName
    transaction.deliveryAddress = options.deliveryAddress
    transaction.buyerPhoneNumber = options.buyerPhoneNumber
    transaction.total = transactionTotal

    if (options.buyerId) {
      const user = await User.findOne({ where: { id: options.buyerId } })
      if (!user) UserNotFound({ attribute: 'ID', value: options.buyerId })
      transaction.buyerId = options.buyerId
    }

    await Transaction.getRepository().manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(transaction)

        transactionItems.forEach(
          (transactionItem) => (transactionItem.transactionId = transaction.id),
        )
        await transactionalEntityManager.save(TransactionItem, transactionItems)

        if (referrer) {
          const referral = new Referral()
          referral.transaction = transaction
          referral.referrer = referrer

          const referralAmount =
            0.01 * transaction.total <= MAX_REFERRAL_AMOUNT_PER_TRX
              ? 0.01 * transaction.total
              : MAX_REFERRAL_AMOUNT_PER_TRX
          referral.amount = referralAmount

          await transactionalEntityManager.save(referral)
        }
      },
    )

    const refetchedTransaction = await Transaction.findOne({
      where: { id: transaction.id },
      relations: ['transactionItems'],
    })
    return refetchedTransaction
  }

  async getTransactions(): Promise<{
    transactions: Transaction[]
    count: number
  }> {
    const [transactions, count] = await Transaction.findAndCount({
      order: { date: 'DESC' },
    })
    return { transactions, count }
  }

  async getTransactionById(options: { id: number }): Promise<Transaction> {
    const transaction = await Transaction.findOne({
      where: { id: options.id },
      relations: ['transactionItems'],
    })
    if (!transaction)
      TransactionNotFound({ attribute: 'ID', value: options.id })

    return transaction
  }
}
