import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export function VariantAlreadyExistsError() {
  throw new ApiError({
    statusCode: StatusCodes.FORBIDDEN,
    message:
      "There already exists a variant with this name associated with this product",
  });
}
