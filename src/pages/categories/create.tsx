import Layout from '@/components/layouts/admin';
import CreateOrUpdateCategoriesForm from '@/components/category/category-form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Card from '@/components/common/card';
import PageHeading from '@/components/common/page-heading';
import CategoriaForm from '@/components/category/category-form';

export default function CreateCategoriesPage() {
  const { t } = useTranslation();
  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={t('Crear categoria')} />
        </div>
      </Card>
      <CategoriaForm />
    </>
  );
}

CreateCategoriesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
