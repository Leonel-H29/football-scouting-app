import { ApiErrorPayload } from '@/shared/types/api/ApiErrorPayload';

export interface ErrorEnvelope {
  success: false;
  error: ApiErrorPayload;
}
