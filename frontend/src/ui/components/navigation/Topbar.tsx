import { LogOut, PanelLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/ui/hooks/useAuth';

interface Props {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Topbar = ({ sidebarOpen, onToggleSidebar }: Props) => {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar__heading">
        <button
          className="icon-button topbar__menu-button"
          onClick={onToggleSidebar}
          type="button"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={sidebarOpen}
          aria-controls="primary-navigation"
        >
          <PanelLeft size={18} />
        </button>
        <p className="eyebrow">Player intelligence platform</p>
        <h1 className="topbar__title">
          Welcome back{user ? `, ${user.name}` : ''}
        </h1>
      </div>
      <div className="topbar__actions">
        <button
          className="icon-button"
          onClick={logout}
          type="button"
          aria-label="Log out"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </header>
  );
};
