import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { bool, number, object, string } from 'yup'
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
      phoneNumber: string().required(),
      address: string().required(),
      referralCode: string(),
    })
    const body = bodySchema.validateSync(req.body)

    const user = await userService.createUser({
      username: body.username,
      password: body.password,
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
      address: body.address,
      referralCode: body.referralCode,
    })
    res.sendJsonApiResource(StatusCodes.CREATED, user)
  }),
)

userRouter.post(
  '/referral',
  convertTokenToUser,
  verifyLoggedIn,
  asyncHandler(async (req, res) => {
    const bodySchema = object().shape({
      id: number().required(),
      referralCode: string().required(),
    })
    const body = bodySchema.validateSync(req.body)

    const user = await userService.assignUserReferralCode({
      id: body.id,
      referralCode: body.referralCode,
    })
    res.sendJsonApiResource(StatusCodes.OK, user)
  }),
)

userRouter.get(
  '/me',
  convertTokenToUser,
  verifyLoggedIn,
  asyncHandler(async (req, res) => {
    const me = await userService.getUserById({
      id: req.user.id,
      safeUser: false,
      reqUserId: req.user.id,
    })
    res.sendJsonApiResource(StatusCodes.OK, me)
  }),
)

userRouter.get(
  '/:id',
  convertTokenToUser,
  verifyLoggedIn,
  asyncHandler(async (req, res) => {
    const queryStrSchema = object().shape({ safeUser: bool().default(true) })
    const queryStr = queryStrSchema.validateSync(req.query)

    const user = await userService.getUserById({
      id: Number(req.params.id),
      safeUser: queryStr.safeUser,
      reqUserId: req.user.id,
    })
    res.sendJsonApiResource(StatusCodes.OK, user)
  }),
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
      phoneNumber: string(),
      address: string(),
    })
    const body = bodySchema.validateSync(req.body)

    const user = await userService.updateUser({
      id: Number(req.params.id),
      username: body.username,
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
      address: body.address,
    })
    res.sendJsonApiResource(StatusCodes.OK, user)
  }),
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
    res.sendJsonApiResource(StatusCodes.OK, [])
  }),
)

export default userRouter
