import { SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Select = ({ label, id, className = '', children, ...props }: Props) => {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <label className="field" htmlFor={selectId}>
      <span className="field__label">{label}</span>
      <select id={selectId} className={`input ${className}`.trim()} {...props}>
        {children}
      </select>
    </label>
  );
};
