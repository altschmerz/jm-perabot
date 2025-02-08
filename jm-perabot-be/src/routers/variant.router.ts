import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { number, object, string } from 'yup'
import VariantService from '../services/variant.service'
import { asyncHandler } from '../utils/asyncHandler'

const variantRouter = Router()
const variantService = new VariantService()

variantRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      name: string().required(),
      stock: number().required(),
    })
    const body = bodySchema.validateSync(req.body)

    const variant = await variantService.createVariant({
      productId: Number(req.context.productId),
      name: body.name,
      stock: body.stock,
    })
    res.sendJsonApiResource(StatusCodes.CREATED, variant)
  })
)

export default variantRouter
