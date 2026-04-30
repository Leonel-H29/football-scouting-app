import { LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/ui/hooks/useAuth';

export const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Player intelligence platform</p>
        <h1 className="topbar__title">Welcome back{user ? `, ${user.name}` : ''}</h1>
      </div>
      <div className="topbar__actions">
        <div className="topbar__badge">
          <ShieldCheck size={16} />
          <span>JWT secured</span>
        </div>
        <button className="icon-button" onClick={logout} type="button" aria-label="Log out">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
