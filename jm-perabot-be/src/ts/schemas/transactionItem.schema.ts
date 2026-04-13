import { number, object, string } from 'yup'

export const transactionItemBodySchema = object().shape({
  name: string().required(),
  note: string().optional(),
  quantity: number().required().min(1),
  price: number().required().min(0),
  total: number().required().min(0),
})
