import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import User from '../../models/User'

export default function convertTokenToUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return passport.authenticate('jwt', async (error: any, user: any) => {
    if (error) return next(error)

    if (!user) {
      req.context = { user: null }
      next()
      return
    }

    const userFromDb = await User.findOne({ where: { id: user.id } })
    if (!userFromDb) {
      req.context = { user: null }
      next()
      return
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token === undefined || token !== userFromDb.accessToken) {
      req.context = { user: null }
      next()
      return
    }

    req.context = { user: userFromDb }
    next()
  })(req, res, next)
}
