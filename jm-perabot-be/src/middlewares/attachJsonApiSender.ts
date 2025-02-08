import { NextFunction, Request, Response } from 'express'
import { Resource } from '../resources/Resource'
import { sendJsonApiError, sendJsonApiResource } from '../sendJsonApi'

export const attachJsonApiSender = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.sendJsonApiResource = (
    statusCode: number,
    data: Resource | Resource[],
    totalPaginationCount?: string
  ) => sendJsonApiResource(statusCode, res, data, totalPaginationCount)
  res.sendJsonApiError = (
    statusCode: number,
    title: string,
    description?: string
  ) => sendJsonApiError(statusCode, res, title, description)
  next()
}
