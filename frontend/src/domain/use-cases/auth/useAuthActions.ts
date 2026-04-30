import { AuthRepository } from '@/domain/ports/auth.port';
import { LoginPayload, RegisterPayload } from '@/shared/types/domain';
import { Result, err, ok } from '@/shared/types/result';

export interface AuthActions {
  login(payload: LoginPayload): Promise<Result<void, string>>;
  register(payload: RegisterPayload): Promise<Result<void, string>>;
  logout(): void;
}

export const createAuthActions = (repository: AuthRepository): AuthActions => ({
  async login(payload) {
    const response = await repository.login(payload);
    if (!response.ok) {
      return err(response.error);
    }
    return ok(undefined);
  },
  async register(payload) {
    const response = await repository.register(payload);
    if (!response.ok) {
      return err(response.error);
    }
    return ok(undefined);
  },
  logout() {
    repository.clearSession();
  },
});
