import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { array, object, string } from 'yup'
import VariantService from '../services/variant.service'
import { variantOptionBodySchema } from '../ts/schemas/variantOption.schema'
import { asyncHandler } from '../utils/asyncHandler'

const variantRouter = Router()
const variantService = new VariantService()

variantRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      name: string().required(),
      options: array().of(variantOptionBodySchema).min(1).required(),
    })
    const body = bodySchema.validateSync(req.body)

    const variant = await variantService.createVariant({
      productId: Number(req.context.productId),
      name: body.name,
      variantOptions: body.options,
    })
    res.sendResource({ statusCode: StatusCodes.CREATED, data: variant })
  })
)

export default variantRouter
