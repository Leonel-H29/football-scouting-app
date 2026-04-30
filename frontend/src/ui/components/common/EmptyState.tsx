import { ReactNode } from 'react';

export const EmptyState = ({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) => (
  <div className="empty-state">
    <h3>{title}</h3>
    <p>{subtitle}</p>
    {action}
  </div>
);
