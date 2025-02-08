import { INTERNAL_SERVER_ERROR } from "http-status-codes";

const DEFAULT_API_ERROR_TITLE = "Internal Server Error.";
const DEFAULT_API_ERROR_MESSAGE =
  "Something is not working in the back-end. Please contact back-end team to resolve this issue.";

export default class ApiError extends Error {
  private _title: string;
  private _statusCode: number;
  private _message: string;

  constructor(statusCode: number, title: string, message: string) {
    super(message || DEFAULT_API_ERROR_MESSAGE);
    this._title = title || DEFAULT_API_ERROR_TITLE;
    this._statusCode = statusCode || INTERNAL_SERVER_ERROR;
    this._message = message || DEFAULT_API_ERROR_MESSAGE;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get title(): string {
    return this._title;
  }

  get message(): string {
    return this._message;
  }
}
