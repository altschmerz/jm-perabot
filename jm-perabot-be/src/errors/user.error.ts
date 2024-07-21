import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export function UserNotFound(options: { attribute: string; value: any }) {
  throw new ApiError({
    statusCode: StatusCodes.NOT_FOUND,
    message: `User with ${options.attribute} ${options.value} is not found.`,
  });
}

export function UserAlreadyExistsError(options: {
  attribute: string;
  value: any;
}) {
  throw new ApiError({
    statusCode: StatusCodes.FORBIDDEN,
    message: `There already exists a user with ${options.attribute} ${options.value}`,
  });
}
