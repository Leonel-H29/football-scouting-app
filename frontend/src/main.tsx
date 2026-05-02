import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@/app/router/AppRouter';
import { AppProviders } from '@/app/providers/AppProviders';
import { ToastProvider } from '@/ui/components/common/ToastProvider';
import '@/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);
