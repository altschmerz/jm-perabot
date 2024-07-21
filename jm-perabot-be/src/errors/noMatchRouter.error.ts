import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export function NoMatchRouterError() {
  throw new ApiError({
    statusCode: StatusCodes.NOT_FOUND,
    message: "Url to requested resource does not exist.",
  });
}
