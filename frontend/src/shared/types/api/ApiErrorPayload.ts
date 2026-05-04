import { ValidationIssue } from '@/shared/types/api/ValidationIssue';

export interface ApiErrorPayload {
  code: string;
  message: string;
  issues?: ValidationIssue[];
}
