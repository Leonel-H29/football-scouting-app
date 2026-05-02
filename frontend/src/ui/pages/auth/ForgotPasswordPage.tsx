import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/ui/hooks/useAuth';
import { Card } from '@/ui/components/common/Card';
import { Input } from '@/ui/components/common/Input';
import { PasswordInput } from '@/ui/components/common/PasswordInput';
import { Button } from '@/ui/components/common/Button';
import { useToast } from '@/ui/components/common/ToastProvider';

const emailSchema = z.object({
  email: z.string().email(),
});

const resetSchema = z.object({
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type EmailValues = z.infer<typeof emailSchema>;
type ResetValues = z.infer<typeof resetSchema>;

export const ForgotPasswordPage = () => {
  const { validateEmailExists, recoverPassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [validatedEmail, setValidatedEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const emailForm = useForm<EmailValues>({ resolver: zodResolver(emailSchema) });
  const resetForm = useForm<ResetValues>({ resolver: zodResolver(resetSchema) });

  const onValidateEmail = async (values: EmailValues) => {
    setError(null);
    const result = await validateEmailExists(values.email);
    if (!result.ok) {
      setError(result.error);
      showToast(result.error, 'error');
      return;
    }
    setValidatedEmail(values.email);
    showToast('Email found. You can now set a new password.', 'success');
  };

  const onResetPassword = async (values: ResetValues) => {
    if (!validatedEmail) {
      return;
    }
    setError(null);
    const result = await recoverPassword(validatedEmail, values.password, values.confirmPassword);
    if (!result.ok) {
      setError(result.error);
      showToast(result.error, 'error');
      return;
    }
    showToast('Password updated successfully. Please sign in.', 'success');
    navigate('/login', { replace: true });
  };

  return (
    <Card className="auth-form">
      <h1>Recover account</h1>
      <p>Enter your email and set a new password.</p>
      {error ? <p className="field__hint" role="alert">{error}</p> : null}

      {!validatedEmail ? (
        <form className="form-stack" onSubmit={emailForm.handleSubmit(onValidateEmail)}>
          <Input label="Email" type="email" {...emailForm.register('email')} error={emailForm.formState.errors.email?.message} />
          <Button type="submit" disabled={emailForm.formState.isSubmitting}>Validate email</Button>
        </form>
      ) : (
        <form className="form-stack" onSubmit={resetForm.handleSubmit(onResetPassword)}>
          <Input label="Email" value={validatedEmail} disabled />
          <PasswordInput label="New password" {...resetForm.register('password')} error={resetForm.formState.errors.password?.message} autoComplete="new-password" />
          <PasswordInput label="Confirm password" {...resetForm.register('confirmPassword')} error={resetForm.formState.errors.confirmPassword?.message} autoComplete="new-password" />
          <Button type="submit" disabled={resetForm.formState.isSubmitting}>Update password</Button>
        </form>
      )}
      <p className="auth-footnote">Remembered it? <Link to="/login">Sign in</Link></p>
    </Card>
  );
};
