import { ErrorEnvelope } from '@/shared/types/api/ErrorEnvelope';
import { SuccessEnvelope } from '@/shared/types/api/SuccessEnvelope';

export type Envelope<T> = SuccessEnvelope<T> | ErrorEnvelope;
