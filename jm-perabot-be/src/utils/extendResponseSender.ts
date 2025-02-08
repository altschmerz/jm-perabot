import { NextFunction, Request, Response } from 'express'
import { BaseEntity } from '../models/BaseEntity'
import { Resource } from '../resources/Resource'
import { sendResource } from './sendResponse'

export default function extendResponseSender(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  res.sendResource = (options: {
    statusCode: number
    data: BaseEntity | BaseEntity[] | Resource | Resource[]
    count?: number
  }) => sendResource(res, options.statusCode, options.data, options.count)
  next()
}
