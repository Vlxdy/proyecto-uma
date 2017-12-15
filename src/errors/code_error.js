module.exports = class CodeError extends Error {
  constructor(errorMessage, statusCode, errorCode) {
    super(errorMessage);
    this.name = 'CodeError';
    this.message = errorMessage || 'Ha ocurrido un error';
    this.statusCode = statusCode || 0;
    this.errorCode = errorCode || 500;
  }
};
