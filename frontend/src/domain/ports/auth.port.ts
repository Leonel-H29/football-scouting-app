import {
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
} from '@/shared/types/domain';
import { Result } from '@/shared/types/result';

export interface AuthRepository {
  login(payload: LoginPayload): Promise<Result<AuthSession, string>>;
  register(payload: RegisterPayload): Promise<Result<AuthUser, string>>;
  getUserById(id: string): Promise<Result<AuthUser, string>>;
  findUserByEmail(email: string): Promise<Result<AuthUser, string>>;
  updateUser(
    id: string,
    payload: UpdateUserPayload
  ): Promise<Result<AuthUser, string>>;
  getCurrentUser(): AuthUser | null;
  saveCurrentUser(user: AuthUser): void;
  getCurrentPassword(): string | null;
  saveCurrentPassword(password: string): void;
  saveSession(session: AuthSession): void;
  getSession(): AuthSession | null;
  clearSession(): void;
}
