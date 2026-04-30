import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  children: ReactNode;
}

export const Button = ({ variant = 'primary', className = '', children, ...props }: Props) => (
  <button className={`button button--${variant} ${className}`.trim()} {...props}>
    {children}
  </button>
);
