import { TransactionTotalMismatch } from '../errors/transaction.error'
import { TransactionItemTotalMismatch } from '../errors/transactionItem.error'
import { UserNotFound } from '../errors/user.error'
import Transaction from '../models/Transaction'
import TransactionItem from '../models/TransactionItem'
import User from '../models/User'
import { TransactionItemRequest } from '../ts/types/transactionItem.types'
import BaseService from './BaseService'

export default class TransactionService extends BaseService {
  async createTransaction(options: {
    buyerName: string
    deliveryAddress: string
    buyerPhoneNumber: string
    total: number
    transactionItems: TransactionItemRequest[]
    buyerId?: number
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
}
