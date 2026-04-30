import { AuthSession, AuthUser, LoginPayload, RegisterPayload } from '@/shared/types/domain';
import { Result } from '@/shared/types/result';

export interface AuthRepository {
  login(payload: LoginPayload): Promise<Result<AuthSession, string>>;
  register(payload: RegisterPayload): Promise<Result<AuthUser, string>>;
  getCurrentUser(): AuthUser | null;
  saveCurrentUser(user: AuthUser): void;
  saveSession(session: AuthSession): void;
  getSession(): AuthSession | null;
  clearSession(): void;
}
