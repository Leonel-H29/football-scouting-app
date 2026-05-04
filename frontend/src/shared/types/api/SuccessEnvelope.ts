export interface SuccessEnvelope<T> {
  success: true;
  data: T;
}
