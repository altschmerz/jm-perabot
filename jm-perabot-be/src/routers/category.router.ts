import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { number, object, string } from 'yup'
import CategoryService from '../services/category.service'
import { asyncHandler } from '../utils/asyncHandler'

const categoryRouter = Router()
const categoryService = new CategoryService()

categoryRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      name: string().required(),
    })
    const body = bodySchema.validateSync(req.body)

    const category = await categoryService.createCategory({
      name: body.name,
    })
    res.sendJsonApiResource(StatusCodes.CREATED, category)
  })
)

categoryRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const queryStrSchema = object().shape({
      page: number().integer().min(0).default(0),
      pageSize: number().integer().min(0).default(10),
      name: string(),
    })
    const queryStr = queryStrSchema.validateSync(req.query)

    const { categories, count } = await categoryService.getCategories({
      page: queryStr.page,
      pageSize: queryStr.pageSize,
      name: queryStr.name,
    })
    res.sendJsonApiResource(StatusCodes.OK, categories, count)
  })
)

categoryRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const category = await categoryService.getCategoryById({
      id: Number(req.params.id),
    })
    res.sendJsonApiResource(StatusCodes.OK, category)
  })
)

categoryRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      id: string(),
      name: string().required(),
    })
    const body = bodySchema.validateSync(req.body)

    const category = await categoryService.updateCategory({
      id: Number(req.params.id),
      name: body.name,
    })
    res.sendJsonApiResource(StatusCodes.OK, category)
  })
)

export default categoryRouter
