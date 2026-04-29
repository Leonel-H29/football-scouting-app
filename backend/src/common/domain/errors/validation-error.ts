import { AppError } from './app-error';

export class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;
  readonly issues: ReadonlyArray<string>;

  constructor(message: string, issues: ReadonlyArray<string>) {
    super(message);
    this.issues = issues;
  }
}
