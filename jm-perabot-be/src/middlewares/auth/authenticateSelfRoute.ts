import { NextFunction, Request, Response } from "express";
import { UnauthorizedAccessError } from "../../errors/auth.error";
import { asyncHandler } from "../../utils/asyncHandler";

export default function authenticateSelfRoute(options: { ownerIdKey: string }) {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.context.user;
      if (user.id.toString() !== req.params[options.ownerIdKey])
        UnauthorizedAccessError();

      next();
    }
  );
}
