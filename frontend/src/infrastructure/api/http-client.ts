import { Envelope, HttpError, HttpResult } from '@/shared/types/api';
import { PaginationMeta } from '@/shared/types/domain';

const normalizeBaseUrl = (value: string): string => value.replace(/\/$/, '');

export class HttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly getToken: () => string | null,
  ) {}

  async request<T>(path: string, init: RequestInit = {}): Promise<HttpResult<T>> {
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');

    const token = this.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    try {
      const response = await fetch(`${normalizeBaseUrl(this.baseUrl)}${path}`, {
        ...init,
        headers,
      });

      const payload = await response.json() as Envelope<T> & { pagination?: PaginationMeta };
      if (payload.success) {
        return {
          ok: true,
          status: response.status,
          data: payload.data,
          pagination: payload.pagination,
        };
      }

      const error: HttpError = payload.error;
      return { ok: false, status: response.status, error };
    } catch {
      return {
        ok: false,
        status: 0,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Unable to reach the backend service.',
        },
      };
    }
  }
}
