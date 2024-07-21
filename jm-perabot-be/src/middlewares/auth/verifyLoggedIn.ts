import { NextFunction, Request, Response } from "express";
import { UnauthorizedAccessError } from "../../errors/auth.error";
import { asyncHandler } from "../../utils/asyncHandler";

export default function verifyLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return asyncHandler(async (req, res, next) => {
    const user = req.context.user;
    if (!user) UnauthorizedAccessError();

    next();
  })(req, res, next);
}
