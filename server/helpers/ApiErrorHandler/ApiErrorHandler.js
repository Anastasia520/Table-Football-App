class ApiErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiErrorHandler(400, message);
  }

  static internal(message) {
    return new ApiErrorHandler(500, message);
  }

  static forbidden(message) {
    return new ApiErrorHandler(403, message);
  }
}

module.exports = ApiErrorHandler;
