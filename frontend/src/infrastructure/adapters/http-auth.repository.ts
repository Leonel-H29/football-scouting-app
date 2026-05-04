import { AuthRepository } from '@/domain/ports/auth.port';
import { HttpClient } from '@/infrastructure/api/http-client';
import { LoginResponse } from '@/infrastructure/adapters/types/auth/LoginResponse';
import { RegisterResponse } from '@/infrastructure/adapters/types/auth/RegisterResponse';
import { storage, storageKeys } from '@/infrastructure/storage/local-storage';
import {
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
} from '@/shared/types/domain';
import { Result, err, ok } from '@/shared/types/result';
import { readJson } from '@/shared/utils/readJson';

const passwordKey = 'scoutinglab.current.password';

export class HttpAuthRepository implements AuthRepository {
  constructor(private readonly client: HttpClient) {}

  async login(payload: LoginPayload): Promise<Result<AuthSession, string>> {
    const result = await this.client.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    console.log('result: ', result);

    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Login failed.');
    }

    const session: AuthSession = result.data;
    this.saveSession(session);
    return ok(session);
  }

  async register(payload: RegisterPayload): Promise<Result<AuthUser, string>> {
    const result = await this.client.request<RegisterResponse>(
      '/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Registration failed.');
    }

    const user: AuthUser = result.data;
    this.saveCurrentUser(user);
    return ok(user);
  }

  async getUserById(id: string): Promise<Result<AuthUser, string>> {
    const result = await this.client.request<AuthUser>(`/api/users/${id}`);
    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Unable to fetch user.');
    }
    return ok(result.data);
  }

  async findUserByEmail(email: string): Promise<Result<AuthUser, string>> {
    const query = new URLSearchParams({ email }).toString();
    const result = await this.client.request<AuthUser>(
      `/api/users/by-email?${query}`
    );
    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Unable to find user by email.');
    }
    return ok(result.data);
  }

  async updateUser(
    id: string,
    payload: UpdateUserPayload
  ): Promise<Result<AuthUser, string>> {
    const result = await this.client.request<AuthUser>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Unable to update user.');
    }
    this.saveCurrentUser(result.data);
    return ok(result.data);
  }

  getCurrentUser(): AuthUser | null {
    return readJson<AuthUser | null>(
      storage.readString(storageKeys.user),
      null
    );
  }

  saveCurrentUser(user: AuthUser): void {
    storage.writeString(storageKeys.user, JSON.stringify(user));
  }

  getCurrentPassword(): string | null {
    return storage.readString(passwordKey);
  }

  saveCurrentPassword(password: string): void {
    storage.writeString(passwordKey, password);
  }

  saveSession(session: AuthSession): void {
    storage.writeString(storageKeys.session, JSON.stringify(session));
  }

  getSession(): AuthSession | null {
    return readJson<AuthSession | null>(
      storage.readString(storageKeys.session),
      null
    );
  }

  clearSession(): void {
    storage.remove(storageKeys.session);
    storage.remove(passwordKey);
  }
}
