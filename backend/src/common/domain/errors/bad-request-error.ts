import { AppError } from './app-error';

export class BadRequestError extends AppError {
  readonly code = 'BAD_REQUEST';
  readonly statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}
