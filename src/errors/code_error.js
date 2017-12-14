/* eslint import/prefer-default-export: 0 */
export class CodeError extends Error {
  constructor(errorMessage, errorCode, httpCode) {
    super(errorMessage);
    this.name = 'CodeError';
    this.message = errorMessage || 'Ha ocurrido un error';
    // this.stack = (new Error(errorMessage)).stack;
    this.codigoError = errorCode || 0;
    this.httpCode = httpCode || 500;
  }
}
