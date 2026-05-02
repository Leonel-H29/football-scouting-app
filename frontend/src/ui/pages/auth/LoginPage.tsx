import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/ui/hooks/useAuth';
import { Input } from '@/ui/components/common/Input';
import { Button } from '@/ui/components/common/Button';
import { Card } from '@/ui/components/common/Card';
import { PasswordInput } from '@/ui/components/common/PasswordInput';
import { useToast } from '@/ui/components/common/ToastProvider';

const schema = z.object({
  username: z.string().min(4).max(30),
  password: z.string().min(8).max(128),
});

type LoginFormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    const result = await login(values);
    if (!result.ok) {
      setServerError(result.error);
      showToast(result.error, 'error');
      return;
    }
    showToast('Welcome back!', 'success');
  };

  return (
    <Card className="auth-form">
      <h1>Sign in</h1>
      <p>Access the player intelligence dashboard.</p>
      {serverError ? <p className="field__hint" role="alert">{serverError}</p> : null}
      <form onSubmit={handleSubmit(onSubmit)} className="form-stack">
        <Input label="Username" {...register('username')} error={errors.username?.message} placeholder="leo.messi10" />
        <PasswordInput label="Password" {...register('password')} error={errors.password?.message} placeholder="••••••••" autoComplete="current-password" />
        <Button type="submit" disabled={isSubmitting}>Login</Button>
      </form>
      <p className="auth-footnote"><Link to="/forgot-password">Forgot your password?</Link></p>
      <p className="auth-footnote">Need an account? <Link to="/register">Register</Link></p>
    </Card>
  );
};
