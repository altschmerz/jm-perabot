import { BaseEntity } from '../../models/BaseEntity'
import { Resource } from '../../resources/Resource'

declare module 'express' {
  export interface Request {
    context?: { [key: string]: any }
  }

  export interface Response {
    sendResource(options: {
      statusCode: number
      data: Resource | Resource[] | BaseEntity | BaseEntity[]
      count?: number
    }): void
  }
}
