import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';

interface Props {
  onSubmit: (values: { email: string }) => void;
  loading: boolean;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
});

const EnterEmailView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{ email: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label={t('form:input-label-email')}
        {...register('email')}
        type="email"
        variant="outline"
        className="mb-5"
        placeholder="demo@demo.com"
        error={t(errors.email?.message!)}
      />
      <Button className="h-11 w-full" loading={loading} disabled={loading}>
        {t('form:text-submit-email')}
      </Button>
    </form>
  );
};

export default EnterEmailView;
function yupResolver(schema: yup.ObjectSchema<{ email: string; }, yup.AnyObject, { email: undefined; }, "">): import("react-hook-form").Resolver<{ email: string; }, any> | undefined {
  throw new Error('Function not implemented.');
}

