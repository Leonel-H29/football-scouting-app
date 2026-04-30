import { ReactNode } from 'react';

export const Tag = ({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'accent' }) => (
  <span className={`tag tag--${tone}`}>{children}</span>
);
