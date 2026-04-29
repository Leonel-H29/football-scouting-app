import type { ErrorRequestHandler } from 'express';
import { AppError } from '../../domain/errors/app-error';
import { ValidationError } from '../../domain/errors/validation-error';

export const errorHandlerMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ValidationError) {
    response.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        issues: error.issues
      }
    });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message
      }
    });
    return;
  }

  response.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    }
  });
};
