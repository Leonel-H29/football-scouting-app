import { AuthRepository } from '@/domain/ports/auth.port';
import { HttpAuthRepository } from '@/infrastructure/adapters/http-auth.repository';
import { MockAuthRepository } from '@/infrastructure/adapters/mock-auth.repository';
import { LoginPayload, RegisterPayload } from '@/shared/types/domain';
import { Result } from '@/shared/types/result';

const shouldFallback = (message: string): boolean => message.toLowerCase().includes('unable to reach');

export class CombinedAuthRepository implements AuthRepository {
  constructor(
    private readonly httpRepository: HttpAuthRepository,
    private readonly mockRepository: MockAuthRepository,
  ) {}

  async login(payload: LoginPayload): Promise<Result<import('@/shared/types/domain').AuthSession, string>> {
    const result = await this.httpRepository.login(payload);
    if (!result.ok && shouldFallback(result.error)) {
      return this.mockRepository.login(payload);
    }
    return result;
  }

  async register(payload: RegisterPayload): Promise<Result<import('@/shared/types/domain').AuthUser, string>> {
    const result = await this.httpRepository.register(payload);
    if (!result.ok && shouldFallback(result.error)) {
      return this.mockRepository.register(payload);
    }
    return result;
  }

  getCurrentUser() {
    return this.httpRepository.getCurrentUser() ?? this.mockRepository.getCurrentUser();
  }

  saveCurrentUser(user: import('@/shared/types/domain').AuthUser): void {
    this.httpRepository.saveCurrentUser(user);
    this.mockRepository.saveCurrentUser(user);
  }

  saveSession(session: import('@/shared/types/domain').AuthSession): void {
    this.httpRepository.saveSession(session);
    this.mockRepository.saveSession(session);
  }

  getSession() {
    return this.httpRepository.getSession() ?? this.mockRepository.getSession();
  }

  clearSession(): void {
    this.httpRepository.clearSession();
    this.mockRepository.clearSession();
  }
}
