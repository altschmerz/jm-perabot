import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export function PurchaseNotFound(options: { attribute: string; value: any }) {
  throw new ApiError({
    statusCode: StatusCodes.NOT_FOUND,
    message: `Purchase with ${options.attribute} ${options.value} is not found.`,
  });
}
