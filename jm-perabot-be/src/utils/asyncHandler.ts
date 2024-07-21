import { NextFunction, Request, Response } from "express";

/**
 * Wraps async handler that contains async/await with catch (so that the handler body does not have to put in try catch block).
 * Read this for more context: https://zellwk.com/blog/async-await-express/.
 * @param callback The asyn handler to run.
 */
export const asyncHandler = (
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};
