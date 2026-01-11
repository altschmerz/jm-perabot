import { number, object, string } from 'yup'

export const variantBodySchema = object().shape({
  name: string().required(),
  sku: string().required(),
  stock: number().required(),
})
