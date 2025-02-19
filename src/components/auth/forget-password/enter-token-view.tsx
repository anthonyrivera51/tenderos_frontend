import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';

interface Props {
  onSubmit: (values: { token: string }) => void;
  loading: boolean;
}

const schema = yup.object().shape({
  token: yup.string().required('form:error-token-required'),
});

const EnterTokenView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label={t('form:token-label')}
        {...register('token')}
        variant="outline"
        className="mb-5"
        error={t(errors.token?.message!)}
      />
      <Button className="h-11 w-full" loading={loading} disabled={loading}>
        {t('form:text-submit-token')}
      </Button>
    </form>
  );
};

export default EnterTokenView;
function yupResolver(schema: yup.ObjectSchema<{ token: string; }, yup.AnyObject, { token: undefined; }, "">): import("react-hook-form").Resolver<{ token: string; }, any> | undefined {
  throw new Error('Function not implemented.');
}

