import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export function ProductNotFound(options: { attribute: string; value: any }) {
  throw new ApiError({
    statusCode: StatusCodes.NOT_FOUND,
    message: `Product with ${options.attribute} ${options.value} is not found.`,
  });
}

export function ProductAlreadyExistsError() {
  throw new ApiError({
    statusCode: StatusCodes.FORBIDDEN,
    message: "There already exists a product with this SKU",
  });
}
