import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export function IncorrectPasswordError() {
  throw new ApiError({
    statusCode: StatusCodes.UNAUTHORIZED,
    message: "The password provided is incorrect",
  });
}

export function UnauthorizedAccessError() {
  throw new ApiError({
    statusCode: StatusCodes.UNAUTHORIZED,
    message: "You are trying to access a secured route",
  });
}
