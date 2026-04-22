import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import convertTokenToUser from '../middlewares/auth/convertTokenToUser'
import verifyLoggedIn from '../middlewares/auth/verifyLoggedIn'
import ReferralService from '../services/referral.service'
import { wrapAsyncHandler } from '../utils/wrapAsyncHandler'

const referralRouter = Router()
const referralService = new ReferralService()

referralRouter.get(
  '/',
  convertTokenToUser,
  verifyLoggedIn,
  wrapAsyncHandler(async (req, res) => {
    const { referrals, count } = await referralService.getReferrals()
    res.sendJsonApiResource(StatusCodes.OK, referrals, count)
  }),
)

export default referralRouter
