import { PaginationMeta } from '@/shared/types/domain';

export interface SuccessEnvelope<T> {
  success: true;
  data: T;
}

export interface ValidationIssue {
  property: string;
  constraints: Record<string, string>;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  issues?: ValidationIssue[];
}

export interface ErrorEnvelope {
  success: false;
  error: ApiErrorPayload;
}

export type Envelope<T> = SuccessEnvelope<T> | ErrorEnvelope;

export interface HttpError {
  code: string;
  message: string;
  issues?: ValidationIssue[];
}

export interface HttpResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  pagination?: PaginationMeta;
  error?: HttpError;
}
