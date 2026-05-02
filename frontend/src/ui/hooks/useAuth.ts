import { useDependencies, useAuthState } from '@/app/providers/AppProviders';
import { usePlayerSelectionStore } from '@/app/store/player-selection.store';
import { LoginPayload, RegisterPayload, AuthUser } from '@/shared/types/domain';
import { err, ok } from '@/shared/types/result';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { authActions, authRepository } = useDependencies();
  const { user, session, setUser, setSession } = useAuthState();
  const navigate = useNavigate();

  const login = async (payload: LoginPayload) => {
    const result = await authRepository.login(payload);
    if (result.ok) {
      setSession(result.value);
      authRepository.saveCurrentPassword(payload.password);
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
      authRepository.saveCurrentPassword(payload.password);
    }
    return result;
  };

  const refreshUser = async (id: string) => {
    const result = await authRepository.getUserById(id);
    if (result.ok) {
      authRepository.saveCurrentUser(result.value);
      setUser(result.value);
    }
    return result;
  };

  const recoverPassword = async (email: string, password: string, confirmPassword: string) => {
    const userByEmailResult = await authRepository.findUserByEmail(email);
    if (!userByEmailResult.ok) {
      return userByEmailResult;
    }

    const userToUpdate = userByEmailResult.value;
    const result = await authRepository.updateUser(userToUpdate.id, {
      name: userToUpdate.name,
      surname: userToUpdate.surname,
      email: userToUpdate.email,
      username: userToUpdate.username,
      password,
      confirmPassword,
    });

    if (result.ok && user?.id === result.value.id) {
      authRepository.saveCurrentPassword(password);
      setUser(result.value);
    }

    return result;
  };

  const validateEmailExists = async (email: string) => authRepository.findUserByEmail(email);

  const updateProfile = async (payload: {
    name: string;
    surname: string;
    email: string;
    username: string;
    password?: string;
    confirmPassword?: string;
  }) => {
    if (!user) {
      return err('No active user session.');
    }

    const preservedPassword = authRepository.getCurrentPassword();
    const password = payload.password || preservedPassword;
    const confirmPassword = payload.confirmPassword || password;

    if (!password || !confirmPassword) {
      return err('Please set a password before saving changes.');
    }

    const result = await authRepository.updateUser(user.id, {
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      username: payload.username,
      password,
      confirmPassword,
    });

    if (!result.ok) {
      return result;
    }

    authRepository.saveCurrentUser(result.value);
    if (payload.password) {
      authRepository.saveCurrentPassword(payload.password);
    }
    setUser(result.value);
    return ok(result.value);
  };

  const updateUser = (nextUser: AuthUser) => {
    authRepository.saveCurrentUser(nextUser);
    setUser(nextUser);
  };

  const logout = () => {
    authActions.logout();
    usePlayerSelectionStore.getState().clearSelectedPlayerIds();
    setUser(null);
    setSession(null);
    navigate('/login', { replace: true });
  };

  return {
    user,
    session,
    login,
    register,
    refreshUser,
    validateEmailExists,
    recoverPassword,
    updateProfile,
    updateUser,
    logout,
    isAuthenticated: Boolean(session),
  };
};
