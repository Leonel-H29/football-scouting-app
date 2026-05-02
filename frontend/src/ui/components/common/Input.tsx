import { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  rightElement?: ReactNode;
}

export const Input = ({ label, hint, error, id, className = '', rightElement, ...props }: Props) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <label className="field" htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <span className="field__control">
        <input aria-invalid={Boolean(error)} id={inputId} className={`input ${className}`.trim()} {...props} />
        {rightElement}
      </span>
      {error ? <span className="field__hint" role="alert">{error}</span> : hint ? <span className="field__hint">{hint}</span> : null}
    </label>
  );
};
