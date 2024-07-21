import { BaseEntity } from "../../models/BaseEntity";
import BaseResource from "../../resources/BaseResource";

declare module "express" {
  export interface Request {
    context?: { [key: string]: any };
  }

  export interface Response {
    sendResource(options: {
      statusCode: number;
      data: BaseResource | BaseResource[] | BaseEntity | BaseEntity[];
      count?: number;
    }): void;
  }
}
