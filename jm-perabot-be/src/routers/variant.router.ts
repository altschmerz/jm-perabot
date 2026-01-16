import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import { number, object, string } from 'yup'
import VariantService from '../services/variant.service'
import { variantBodySchema } from '../ts/schemas/variant.schema'
import { asyncHandler } from '../utils/asyncHandler'

const variantRouter = Router()
const variantService = new VariantService()

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
})

variantRouter.post(
  '/',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const bodySchema = variantBodySchema
    const body = bodySchema.validateSync(req.body)

    const variant = await variantService.createVariant(
      {
        productId: Number(req.context.productId),
        name: body.name,
        sku: body.sku,
        stock: body.stock,
      },
      req.file
    )
    res.sendJsonApiResource(StatusCodes.CREATED, variant)
  })
)

variantRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const { variants, count } = await variantService.getVariants({
      productId: Number(req.context.productId),
    })
    res.sendJsonApiResource(StatusCodes.OK, variants, count)
  })
)

// TODO: Product ID redundant
variantRouter.put(
  '/:id',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      name: string(),
      sku: string(),
      stock: number().min(0),
    })
    const body = bodySchema.validateSync(req.body)

    const variant = await variantService.updateVariant(
      {
        id: Number(req.params.id),
        name: body.name,
        sku: body.sku,
        stock: body.stock,
      },
      req.file
    )
    res.sendJsonApiResource(StatusCodes.OK, variant)
  })
)

// TODO: Ideally delete shouldn't return anything except status code
variantRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const deletedVariant = await variantService.deleteVariant({
      id: Number(req.params.id),
    })
    res.sendJsonApiResource(StatusCodes.OK, deletedVariant)
  })
)

export default variantRouter
