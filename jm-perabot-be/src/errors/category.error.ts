import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export function CategoryNotFoundError(options: {
  attribute: string;
  value: any;
}) {
  throw new ApiError({
    statusCode: StatusCodes.FORBIDDEN,
    message: `Category with ${options.attribute} ${options.value} is not found.`,
  });
}

export function CategoryAlreadyExistsError() {
  throw new ApiError({
    statusCode: StatusCodes.FORBIDDEN,
    message: "There already exists a category with this name",
  });
}

export function MalformedCategoryIdsError() {
  throw new ApiError({
    statusCode: StatusCodes.NOT_FOUND,
    message: "One or more categories the IDs of which provided do not exist",
  });
}
