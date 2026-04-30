import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/ui/components/navigation/Sidebar';
import { Topbar } from '@/ui/components/navigation/Topbar';

const DESKTOP_MEDIA_QUERY = '(min-width: 981px)';

const getIsDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
};

export const AppLayout = () => {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);
  const [sidebarOpen, setSidebarOpen] = useState(getIsDesktop);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
      setSidebarOpen(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    setSidebarOpen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  }, [isDesktop, location.pathname]);

  return (
    <div
      className={`app-shell${sidebarOpen ? ' app-shell--sidebar-open' : ''}${isDesktop && !sidebarOpen ? ' app-shell--sidebar-collapsed' : ''}`}
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-shell__main">
        <Topbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((current) => !current)}
        />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
