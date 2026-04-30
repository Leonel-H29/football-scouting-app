import { useDependencies, useAuthState } from '@/app/providers/AppProviders';
import { LoginPayload, RegisterPayload, AuthUser } from '@/shared/types/domain';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { authActions, authRepository } = useDependencies();
  const { user, session, setUser, setSession } = useAuthState();
  const navigate = useNavigate();

  const login = async (payload: LoginPayload) => {
    const result = await authRepository.login(payload);
    if (result.ok) {
      setSession(result.value);
      const currentUser = authRepository.getCurrentUser() ?? {
        id: `user-${payload.username}`,
        name: payload.username,
        surname: '',
        email: '',
        username: payload.username,
      };
      setUser(currentUser);
      authRepository.saveCurrentUser(currentUser);
      navigate('/dashboard', { replace: true });
    }
    return result;
  };

  const register = async (payload: RegisterPayload) => {
    const result = await authRepository.register(payload);
    if (result.ok) {
      await login({ username: payload.username, password: payload.password });
      return result;
    }
    return result;
  };

  const updateUser = (nextUser: AuthUser) => {
    authRepository.saveCurrentUser(nextUser);
    setUser(nextUser);
  };

  const logout = () => {
    authActions.logout();
    setUser(null);
    setSession(null);
    navigate('/login', { replace: true });
  };

  return { user, session, login, register, updateUser, logout, isAuthenticated: Boolean(session) };
};
