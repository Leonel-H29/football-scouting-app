import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const Input = ({ label, hint, error, id, className = '', ...props }: Props) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <label className="field" htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <input aria-invalid={Boolean(error)} id={inputId} className={`input ${className}`.trim()} {...props} />
      {error ? <span className="field__hint" role="alert">{error}</span> : hint ? <span className="field__hint">{hint}</span> : null}
    </label>
  );
};
