import Card from '@/components/common/card';
import PageHeading from '@/components/common/page-heading';
import Layout from '@/components/layouts/admin';
import AccordionUsage from '@/components/user/user-create-acordion';
import CustomerCreateForm from '@/components/user/user-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateCustomerPage() {
  const { t } = useTranslation();
  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={t('Crear usuario')} />
        </div>
      </Card>
      <AccordionUsage />
    </>
  );
}
CreateCustomerPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'form', 'common'])),
  },
});
