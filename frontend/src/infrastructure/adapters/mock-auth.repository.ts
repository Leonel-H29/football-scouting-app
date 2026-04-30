import { AuthRepository } from '@/domain/ports/auth.port';
import { AuthSession, AuthUser, LoginPayload, RegisterPayload } from '@/shared/types/domain';
import { Result, err, ok } from '@/shared/types/result';
import { storage, storageKeys } from '@/infrastructure/storage/local-storage';

const userKey = storageKeys.user;
const sessionKey = storageKeys.session;

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

const readUsers = (): AuthUser[] => readJson(storage.readString('scoutinglab.mock.users'), []);
const writeUsers = (users: AuthUser[]): void => { storage.writeString('scoutinglab.mock.users', JSON.stringify(users)); };
const makeToken = (username: string): string => `mock.${btoa(username)}.${Date.now()}`;

export class MockAuthRepository implements AuthRepository {
  login(payload: LoginPayload): Promise<Result<AuthSession, string>> {
    const users = readUsers();
    const user = users.find((item) => item.username === payload.username);
    if (!user) {
      return Promise.resolve(err('Invalid credentials. Please register first.'));
    }

    const session: AuthSession = { accessToken: makeToken(user.username), tokenType: 'Bearer' };
    this.saveSession(session);
    this.saveCurrentUser(user);
    return Promise.resolve(ok(session));
  }

  register(payload: RegisterPayload): Promise<Result<AuthUser, string>> {
    const users = readUsers();
    const existing = users.find((item) => item.email === payload.email || item.username === payload.username);
    if (existing) {
      return Promise.resolve(err('Email or username already exists.'));
    }

    const user: AuthUser = {
      id: `user-${crypto.randomUUID()}`,
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      username: payload.username,
    };

    writeUsers([user, ...users]);
    this.saveCurrentUser(user);
    this.saveSession({ accessToken: makeToken(user.username), tokenType: 'Bearer' });
    return Promise.resolve(ok(user));
  }

  getCurrentUser(): AuthUser | null {
    return readJson<AuthUser | null>(storage.readString(userKey), null);
  }

  saveCurrentUser(user: AuthUser): void {
    storage.writeString(userKey, JSON.stringify(user));
  }

  saveSession(session: AuthSession): void {
    storage.writeString(sessionKey, JSON.stringify(session));
  }

  getSession(): AuthSession | null {
    return readJson<AuthSession | null>(storage.readString(sessionKey), null);
  }

  clearSession(): void {
    storage.remove(sessionKey);
  }
}
