import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { array, number, object, string } from 'yup'
import ProductService from '../services/product.service'
import { variantBodySchema } from '../ts/schemas/variant.schema'
import { asyncHandler } from '../utils/asyncHandler'
import variantRouter from './variant.router'

const productRouter = Router()
const productService = new ProductService()

productRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      sku: string().required(),
      name: string().required(),
      description: string().required(),
      purchasePrice: number().positive().required(),
      retailPrice: number().positive().required(),
      wholesalerPrice: number().positive().required(),
      totalStock: number().integer().positive().required(),
      variants: array().of(variantBodySchema).min(1),
    })
    const body = bodySchema.validateSync(req.body)

    const product = await productService.createProduct({
      sku: body.sku,
      name: body.name,
      description: body.description,
      purchasePrice: body.purchasePrice,
      retailPrice: body.retailPrice,
      wholesalerPrice: body.wholesalerPrice,
      totalStock: body.totalStock,
      variants: body.variants,
    })
    res.sendResource({ statusCode: StatusCodes.CREATED, data: product })
  })
)

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const queryStrSchema = object().shape({
      page: number().integer().min(0).default(0),
      pageSize: number().integer().min(0).default(10),
    })
    const queryStr = queryStrSchema.validateSync(req.query)

    const { products, count } = await productService.getProducts({
      page: queryStr.page,
      pageSize: queryStr.pageSize,
    })
    res.sendResource({ statusCode: StatusCodes.OK, data: products, count })
  })
)

productRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await productService.getProductById({
      id: Number(req.params.id),
    })
    res.sendResource({ statusCode: StatusCodes.OK, data: product })
  })
)

productRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      sku: string(),
      name: string(),
      description: string(),
      purchasePrice: number().positive(),
      retailPrice: number().positive(),
      wholesalerPrice: number().positive(),
      totalStock: number().integer().positive(),
    })
    const body = bodySchema.validateSync(req.body)

    const product = await productService.updateProduct({
      id: Number(req.params.id),
      sku: body.sku,
      name: body.name,
      description: body.description,
      purchasePrice: body.purchasePrice,
      retailPrice: body.retailPrice,
      wholesalerPrice: body.wholesalerPrice,
      totalStock: body.totalStock,
    })
    res.sendResource({ statusCode: StatusCodes.OK, data: product })
  })
)

productRouter.use(
  '/:productId/variants',
  asyncHandler(async (req, res, next) => {
    req.context = { productId: req.params.productId }
    variantRouter(req, res, next)
  })
)

export default productRouter
