import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, GitCompareArrows, UserCircle2 } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/players', label: 'Players', icon: Users },
  { to: '/players/compare', label: 'Compare', icon: GitCompareArrows },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
];

export const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar__brand">
      <span className="brand-mark brand-mark--small">SL</span>
    </div>
    <nav className="sidebar__nav" aria-label="Primary">
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}>
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  </aside>
);
