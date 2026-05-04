import { ValidationIssue } from '@/shared/types/api/ValidationIssue';

export interface HttpError {
  code: string;
  message: string;
  issues?: ValidationIssue[];
}
