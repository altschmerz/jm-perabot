import { Response } from 'express'
import { BaseEntity } from 'typeorm'
import { Resource } from '../resources/Resource'

interface ResponsePayload {
  data: BaseEntity | BaseEntity[] | Resource | Resource[]
  count?: number
}

export function sendError(res: Response, statusCode: number, message: string) {
  res.status(statusCode).send({
    error: {
      message,
    },
  })
}

export function sendResource(
  res: Response,
  statusCode: number,
  data: BaseEntity | BaseEntity[] | Resource | Resource[],
  count?: number
) {
  const payload: ResponsePayload = { data }
  if (count) payload.count = count

  res.status(statusCode).send(payload)
}
