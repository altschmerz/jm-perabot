import { Response } from "express";
import { BaseEntity } from "typeorm";
import BaseResource from "../resources/BaseResource";

interface ResponsePayload {
  data: BaseEntity | BaseEntity[] | BaseResource | BaseResource[];
  count?: number;
}

export function sendError(res: Response, statusCode: number, message: string) {
  res.status(statusCode).send({
    error: {
      message,
    },
  });
}

export function sendResource(
  res: Response,
  statusCode: number,
  data: BaseEntity | BaseEntity[] | BaseResource | BaseResource[],
  count?: number
) {
  const payload: ResponsePayload = { data };
  if (count) payload.count = count;

  res.status(statusCode).send(payload);
}
