export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  static unAuthorized(message: string) {
    return new CustomError(message, 401);
  }

  static forbidden(message: string) {
    return new CustomError(message, 403);
  }

  static notFound(message: string) {
    return new CustomError(message, 404);
  }

  static conflict(message: string) {
    return new CustomError(message, 409);
  }

  static unprocessableEntity(message: string) {
    return new CustomError(message, 422);
  }

  static internalServer(message: string) {
    return new CustomError(message, 500);
  }
}
