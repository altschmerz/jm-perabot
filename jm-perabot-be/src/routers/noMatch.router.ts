import { Router } from "express";
import { NoMatchRouterError } from "../errors/noMatchRouter.error";

const noMatchRouter = Router();

noMatchRouter.use(() => NoMatchRouterError());

export default noMatchRouter;
