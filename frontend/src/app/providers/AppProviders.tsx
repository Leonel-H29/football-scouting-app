import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthRepository } from '@/domain/ports/auth.port';
import { PlayerRepository, FavoritePlayersRepository } from '@/domain/ports/player.port';
import { createAuthActions, AuthActions } from '@/domain/use-cases/auth/useAuthActions';
import { createPlayerQueries } from '@/domain/use-cases/players/usePlayerQueries';
import { HttpClient } from '@/infrastructure/api/http-client';
import { CombinedAuthRepository } from '@/infrastructure/adapters/combined-auth.repository';
import { CombinedPlayerRepository } from '@/infrastructure/adapters/combined-player.repository';
import { HttpAuthRepository } from '@/infrastructure/adapters/http-auth.repository';
import { HttpPlayerRepository } from '@/infrastructure/adapters/http-player.repository';
import { LocalFavoritesRepository } from '@/infrastructure/adapters/local-favorites.repository';
import { MockAuthRepository } from '@/infrastructure/adapters/mock-auth.repository';
import { MockPlayerRepository } from '@/infrastructure/adapters/mock-player.repository';
import { environment } from '@/infrastructure/config/environment';
import { AuthSession, AuthUser } from '@/shared/types/domain';

interface AppDependencies {
  authRepository: AuthRepository;
  playerRepository: PlayerRepository;
  favoritesRepository: FavoritePlayersRepository;
  authActions: AuthActions;
  playerQueries: ReturnType<typeof createPlayerQueries>;
}

const dependenciesContext = createContext<AppDependencies | null>(null);
const authStateContext = createContext<{
  user: AuthUser | null;
  session: AuthSession | null;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
} | null>(null);

const readSessionToken = (): string | null => {
  const raw = localStorage.getItem('scoutinglab.session');
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as AuthSession;
    return parsed.accessToken;
  } catch {
    return null;
  }
};

export const useDependencies = (): AppDependencies => {
  const value = useContext(dependenciesContext);
  if (!value) {
    throw new Error('Dependencies are not available.');
  }
  return value;
};

export const useAuthState = () => {
  const value = useContext(authStateContext);
  if (!value) {
    throw new Error('Auth state is not available.');
  }
  return value;
};

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const httpClient = useMemo(
    () => new HttpClient(environment.apiBaseUrl, readSessionToken),
    [],
  );

  const authRepository = useMemo(() => {
    const http = new HttpAuthRepository(httpClient);
    const mock = new MockAuthRepository();
    return environment.useMockApi ? mock : new CombinedAuthRepository(http, mock);
  }, [httpClient]);

  const playerRepository = useMemo(() => {
    const http = new HttpPlayerRepository(httpClient);
    const mock = new MockPlayerRepository();
    return environment.useMockApi ? mock : new CombinedPlayerRepository(http, mock);
  }, [httpClient]);

  const favoritesRepository = useMemo(() => new LocalFavoritesRepository(), []);

  const [user, setUser] = useState<AuthUser | null>(authRepository.getCurrentUser());
  const [session, setSession] = useState<AuthSession | null>(authRepository.getSession());

  useEffect(() => {
    if (user) {
      authRepository.saveCurrentUser(user);
    }
  }, [authRepository, user]);

  useEffect(() => {
    if (session) {
      authRepository.saveSession(session);
    }
  }, [authRepository, session]);

  const dependencies = useMemo<AppDependencies>(() => {
    const authActions = createAuthActions(authRepository);
    return {
      authRepository,
      playerRepository,
      favoritesRepository,
      authActions,
      playerQueries: createPlayerQueries(playerRepository),
    };
  }, [authRepository, playerRepository, favoritesRepository]);

  return (
    <dependenciesContext.Provider value={dependencies}>
      <authStateContext.Provider value={{ user, session, setUser, setSession }}>
        {children}
      </authStateContext.Provider>
    </dependenciesContext.Provider>
  );
};
