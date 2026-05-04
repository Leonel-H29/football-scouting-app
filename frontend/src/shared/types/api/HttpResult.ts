import { PaginationMeta } from '@/shared/types/domain/PaginationMeta';
import { HttpError } from '@/shared/types/api/HttpError';

export interface HttpResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  pagination?: PaginationMeta;
  error?: HttpError;
}
