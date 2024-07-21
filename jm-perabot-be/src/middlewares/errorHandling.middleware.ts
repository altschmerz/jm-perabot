import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "yup";
import ApiError from "../errors/ApiError";

export default function errorHandlingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err instanceof ApiError) {
    const apiError: ApiError = err;
    res.status(apiError.statusCode).send({
      error: {
        message: apiError.message,
      },
    });
    return;
  }

  if (err instanceof ValidationError) {
    const validationError: ValidationError = err;
    res.status(StatusCodes.BAD_REQUEST).send({
      error: {
        type: validationError.type,
        message: validationError.message,
      },
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    error: {
      type: err.name,
      message: err.message,
    },
  });
}
