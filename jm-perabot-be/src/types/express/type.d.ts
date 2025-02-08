import { BaseEntity } from "../../models/BaseEntity";
import { Resource } from "../../resources/Resource";

declare global {
  namespace Express {
    export interface Response {
      /**
       * Sends data as JSON API response.
       * @param statusCode status code of the response.
       * @param data data to convert to resources.
       */
      sendJsonApiResource(
        statusCode: number,
        data: Resource | Resource[] | BaseEntity | BaseEntity[],
        totalPaginationCount?: string | number
      ): void;

      /**
       * Sends error as JSON API response.
       * @param statusCode status code of the response.
       * @param data data to convert to resources.
       */
      sendJsonApiError(
        statusCode: number,
        title?: string,
        description?: string
      ): void;

      resourceMapper?: {
        fromEntity: (datum: Resource) => Resource;
      };
    }
    /**
     * Extending the @types/passport definition to be more complete with our use-case.
     * Currently we are storing id and email in JWT token
     */
    interface User {
      id: number;
      email: string;
    }
    export interface Request {
      user?: User;
    }
  }
}
