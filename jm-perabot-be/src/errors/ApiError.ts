export default class ApiError extends Error {
  public statusCode: number;

  constructor(options: { statusCode: number; message: string }) {
    super(options.message);
    this.statusCode = options.statusCode;
  }
}
