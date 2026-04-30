import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/ui/components/navigation/Sidebar';
import { Topbar } from '@/ui/components/navigation/Topbar';

export const AppLayout = () => (
  <div className="app-shell">
    <Sidebar />
    <div className="app-shell__main">
      <Topbar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  </div>
);
