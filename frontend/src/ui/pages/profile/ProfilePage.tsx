import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/ui/hooks/useAuth';
import { Card } from '@/ui/components/common/Card';
import { Input } from '@/ui/components/common/Input';
import { Button } from '@/ui/components/common/Button';

const schema = z.object({
  name: z.string().min(2).max(60),
  surname: z.string().min(2).max(60),
  email: z.string().email(),
  username: z.string().min(4).max(30),
});

type ProfileValues = z.infer<typeof schema>;

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ProfileValues>({
    resolver: zodResolver(schema),
    values: user ?? { name: '', surname: '', email: '', username: '' },
  });

  const onSubmit = async (values: ProfileValues) => {
    if (user) {
      updateUser({ ...user, ...values });
    }
  };

  return (
    <div className="stack">
      <section>
        <h2>Profile</h2>
        <p className="muted">Manage the account data stored locally in the frontend session.</p>
      </section>
      <Card className="profile-card">
        <form className="form-stack form-stack--two-cols" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" {...register('name')} />
          <Input label="Surname" {...register('surname')} />
          <Input label="Email" {...register('email')} />
          <Input label="Username" {...register('username')} />
          <Button type="submit" disabled={isSubmitting}>Save changes</Button>
        </form>
      </Card>
    </div>
  );
};
