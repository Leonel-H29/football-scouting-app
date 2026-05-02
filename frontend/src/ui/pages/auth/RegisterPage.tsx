import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/ui/hooks/useAuth';
import { Input } from '@/ui/components/common/Input';
import { Button } from '@/ui/components/common/Button';
import { Card } from '@/ui/components/common/Card';
import { PasswordInput } from '@/ui/components/common/PasswordInput';
import { useToast } from '@/ui/components/common/ToastProvider';

const schema = z.object({
  name: z.string().min(2).max(60),
  surname: z.string().min(2).max(60),
  email: z.string().email(),
  username: z.string().min(4).max(30),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof schema>;

export const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
    const result = await registerUser(values);
    if (!result.ok) {
      setServerError(result.error);
      showToast(result.error, 'error');
      return;
    }
    showToast('Account created successfully. Please sign in.', 'success');
    navigate('/login', { replace: true });
  };

  return (
    <Card className="auth-form">
      <h1>Create account</h1>
      <p>Set up your scouting workspace in seconds.</p>
      {serverError ? <p className="field__hint" role="alert">{serverError}</p> : null}
      <form onSubmit={handleSubmit(onSubmit)} className="form-stack form-stack--two-cols">
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Input label="Surname" {...register('surname')} error={errors.surname?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Username" {...register('username')} error={errors.username?.message} />
        <PasswordInput label="Password" {...register('password')} error={errors.password?.message} autoComplete="new-password" />
        <PasswordInput label="Confirm password" {...register('confirmPassword')} error={errors.confirmPassword?.message} autoComplete="new-password" />
        <Button type="submit" disabled={isSubmitting}>Register</Button>
      </form>
      <p className="auth-footnote">Already have an account? <Link to="/login">Sign in</Link></p>
    </Card>
  );
};
