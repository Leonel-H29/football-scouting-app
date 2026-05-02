import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/ui/hooks/useAuth';
import { Card } from '@/ui/components/common/Card';
import { Input } from '@/ui/components/common/Input';
import { Button } from '@/ui/components/common/Button';
import { PasswordInput } from '@/ui/components/common/PasswordInput';
import { useToast } from '@/ui/components/common/ToastProvider';

const schema = z.object({
  name: z.string().min(2).max(60),
  surname: z.string().min(2).max(60),
  email: z.string().email(),
  username: z.string().min(4).max(30),
  password: z.string().min(8).max(128).optional().or(z.literal('')),
  confirmPassword: z.string().min(8).max(128).optional().or(z.literal('')),
}).refine(
  (values) => {
    const hasPassword = Boolean(values.password);
    const hasConfirm = Boolean(values.confirmPassword);
    if (!hasPassword && !hasConfirm) {
      return true;
    }
    return values.password === values.confirmPassword;
  },
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  },
);

type ProfileValues = z.infer<typeof schema>;

export const ProfilePage = () => {
  const { user, refreshUser, updateProfile } = useAuth();
  const { showToast } = useToast();
  const formValues = useMemo(
    () => ({
      name: user?.name ?? '',
      surname: user?.surname ?? '',
      email: user?.email ?? '',
      username: user?.username ?? '',
      password: '',
      confirmPassword: '',
    }),
    [user],
  );

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProfileValues>({
    resolver: zodResolver(schema),
    values: formValues,
  });

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    void refreshUser(user.id);
  }, [user?.id]);

  useEffect(() => {
    reset(formValues);
  }, [formValues, reset]);

  const onSubmit = async (values: ProfileValues) => {
    const result = await updateProfile({
      name: values.name,
      surname: values.surname,
      email: values.email,
      username: values.username,
      password: values.password || undefined,
      confirmPassword: values.confirmPassword || undefined,
    });

    if (!result.ok) {
      showToast(result.error, 'error');
      return;
    }

    showToast('Profile updated successfully.', 'success');
    reset({
      ...values,
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="stack">
      <section>
        <h2>Profile</h2>
        <p className="muted">Manage the account data stored locally in the frontend session.</p>
      </section>
      <Card className="profile-card">
        <form className="form-stack form-stack--two-cols" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" {...register('name')} error={errors.name?.message} />
          <Input label="Surname" {...register('surname')} error={errors.surname?.message} />
          <Input label="Email" {...register('email')} error={errors.email?.message} />
          <Input label="Username" {...register('username')} error={errors.username?.message} />
          <PasswordInput label="New password (optional)" {...register('password')} error={errors.password?.message} autoComplete="new-password" />
          <PasswordInput label="Confirm new password" {...register('confirmPassword')} error={errors.confirmPassword?.message} autoComplete="new-password" />
          <Button type="submit" disabled={isSubmitting}>Save changes</Button>
        </form>
      </Card>
    </div>
  );
};
