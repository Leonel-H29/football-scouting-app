import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => (
  <div className="auth-shell">
    <div className="auth-card">
      <Link to="/login" className="brand-link">
        <span className="brand-mark">SL</span>
        <span>Scouting Lab</span>
      </Link>
      <Outlet />
    </div>
  </div>
);
