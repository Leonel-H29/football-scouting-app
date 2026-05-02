
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@/ui/components/layout/AuthLayout';
import { AppLayout } from '@/ui/components/layout/AppLayout';
import { ProtectedRoute } from '@/ui/components/routing/ProtectedRoute';
import { LoginPage } from '@/ui/pages/auth/LoginPage';
import { RegisterPage } from '@/ui/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/ui/pages/auth/ForgotPasswordPage';
import { DashboardPage } from '@/ui/pages/dashboard/DashboardPage';
import { PlayersPage } from '@/ui/pages/players/PlayersPage';
import { FavoritePlayersPage } from '@/ui/pages/players/FavoritePlayersPage';
import { ComparePage } from '@/ui/pages/players/ComparePage';
import { ProfilePage } from '@/ui/pages/profile/ProfilePage';
import { NotFoundPage } from '@/ui/pages/shared/NotFoundPage';

export const AppRouter = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Route>

    <Route
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/players" element={<PlayersPage />} />
      <Route path="/players/favorites" element={<FavoritePlayersPage />} />
      <Route path="/players/compare" element={<ComparePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
