import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GitCompareArrows,
  UserCircle2,
  X,
} from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/players', label: 'Players', icon: Users },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: Props) => (
  <>
    <button
      className={`sidebar-backdrop${open ? ' sidebar-backdrop--visible' : ''}`}
      type="button"
      aria-label="Close sidebar"
      tabIndex={open ? 0 : -1}
      onClick={onClose}
    />
    <aside
      className={`sidebar${open ? ' sidebar--open' : ''}`}
      id="primary-navigation"
    >
      <div className="sidebar__brand">
        <span className="brand-mark brand-mark--small">SL</span>
        <button
          className="icon-button sidebar__close"
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>
      <nav className="sidebar__nav" aria-label="Primary">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  </>
);
