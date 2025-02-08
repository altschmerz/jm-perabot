import { NextFunction, Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import passport from 'passport'
import convertTokenToUser from '../middlewares/auth/convertTokenToUser'
import verifyLoggedIn from '../middlewares/auth/verifyLoggedIn'
import AuthService from '../services/auth.service'
import { asyncHandler } from '../utils/asyncHandler'

const authRouter = Router()
const authService = new AuthService()

authRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', async (error: any, user: any) => {
      try {
        if (error) throw error

        const authRsc = await authService.createAuthResource({ id: user.id })
        res.sendResource({ statusCode: StatusCodes.OK, data: authRsc })
      } catch (error) {
        next(error)
      }
    })(req, res, next)
  }
)

authRouter.post(
  '/logout',
  convertTokenToUser,
  verifyLoggedIn,
  asyncHandler(async (req, res) => {
    await authService.logout({ id: req.context.user.id })
    res.sendResource({ statusCode: StatusCodes.OK, data: [] })
  })
)

export default authRouter
