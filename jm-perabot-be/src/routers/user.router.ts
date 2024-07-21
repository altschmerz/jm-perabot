import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { object, string } from 'yup'
import authenticateSelfRoute from '../middlewares/auth/authenticateSelfRoute'
import convertTokenToUser from '../middlewares/auth/convertTokenToUser'
import verifyLoggedIn from '../middlewares/auth/verifyLoggedIn'
import UserService from '../services/user.service'
import { asyncHandler } from '../utils/asyncHandler'

const userRouter = Router()
const userService = new UserService()

userRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      username: string().required(),
      password: string().required(),
      email: string().required(),
      name: string().required(),
    })
    const body = bodySchema.validateSync(req.body)

    const user = await userService.createUser({
      username: body.username,
      password: body.password,
      email: body.email,
      name: body.name,
    })
    res.sendResource({ statusCode: StatusCodes.CREATED, data: user })
  })
)

userRouter.get(
  '/:id',
  convertTokenToUser,
  verifyLoggedIn,
  asyncHandler(async (req, res) => {
    const user = await userService.getUserById({ id: Number(req.params.id) })
    res.sendResource({ statusCode: StatusCodes.OK, data: user })
  })
)

userRouter.put(
  '/:id',
  convertTokenToUser,
  verifyLoggedIn,
  authenticateSelfRoute({ ownerIdKey: 'id' }),
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      username: string(),
      email: string(),
      name: string(),
    })
    const body = bodySchema.validateSync(req.body)

    const user = await userService.updateUser({
      id: Number(req.params.id),
      username: body.username,
      email: body.email,
      name: body.name,
    })
    res.sendResource({ statusCode: StatusCodes.OK, data: user })
  })
)

userRouter.put(
  '/:id/password',
  convertTokenToUser,
  verifyLoggedIn,
  authenticateSelfRoute({ ownerIdKey: 'id' }),
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      oldPassword: string().required(),
      newPassword: string().required(),
    })
    const body = bodySchema.validateSync(req.body)

    await userService.changePassword({
      id: Number(req.params.id),
      oldPassword: body.oldPassword,
      newPassword: body.newPassword,
    })
    res.sendResource({ statusCode: StatusCodes.OK, data: [] })
  })
)

export default userRouter
