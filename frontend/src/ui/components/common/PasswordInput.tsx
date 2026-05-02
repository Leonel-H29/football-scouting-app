import type { ChangeEventHandler, FocusEventHandler } from 'react';
import { useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/ui/components/common/Input';

interface PasswordInputProps {
  label: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  id?: string;
  autoComplete?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
}

export const PasswordInput = ({ label, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);
  const inputType = useMemo(() => (visible ? 'text' : 'password'), [visible]);

  return (
    <Input
      {...props}
      label={label}
      type={inputType}
      className="input--with-right"
      rightElement={(
        <button
          type="button"
          className="input-visibility-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    />
  );
};
