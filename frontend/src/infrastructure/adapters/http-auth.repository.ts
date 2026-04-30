import { AuthRepository } from '@/domain/ports/auth.port';
import { HttpClient } from '@/infrastructure/api/http-client';
import { storage, storageKeys } from '@/infrastructure/storage/local-storage';
import { AuthSession, AuthUser, LoginPayload, RegisterPayload } from '@/shared/types/domain';
import { Result, err, ok } from '@/shared/types/result';

interface RegisterResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
}

interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
}

const readJson = <T>(raw: string | null, fallback: T): T => {
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export class HttpAuthRepository implements AuthRepository {
  constructor(private readonly client: HttpClient) {}

  async login(payload: LoginPayload): Promise<Result<AuthSession, string>> {
    const result = await this.client.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Login failed.');
    }

    const session: AuthSession = result.data;
    this.saveSession(session);
    return ok(session);
  }

  async register(payload: RegisterPayload): Promise<Result<AuthUser, string>> {
    const result = await this.client.request<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Registration failed.');
    }

    const user: AuthUser = result.data;
    this.saveCurrentUser(user);
    return ok(user);
  }

  getCurrentUser(): AuthUser | null {
    return readJson<AuthUser | null>(storage.readString(storageKeys.user), null);
  }

  saveCurrentUser(user: AuthUser): void {
    storage.writeString(storageKeys.user, JSON.stringify(user));
  }

  saveSession(session: AuthSession): void {
    storage.writeString(storageKeys.session, JSON.stringify(session));
  }

  getSession(): AuthSession | null {
    return readJson<AuthSession | null>(storage.readString(storageKeys.session), null);
  }

  clearSession(): void {
    storage.remove(storageKeys.session);
  }
}
