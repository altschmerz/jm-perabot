export type TransactionItemRequest = {
  name: string
  note?: string
  quantity: number
  price: number
  total: number
  eligibleForReferral: boolean
}
