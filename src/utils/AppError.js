// Клас операційних помилок застосунку. На відміну від несподіваних збоїв,
// такі помилки очікувані (невалідні дані, не знайдено ресурс тощо) і несуть
// коректний HTTP-статус, який обробник помилок віддасть клієнту.
class AppError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, details) {
    return new AppError(400, message, details);
  }

  static notFound(message = 'Ресурс не знайдено') {
    return new AppError(404, message);
  }

  static conflict(message) {
    return new AppError(409, message);
  }
}

module.exports = AppError;
