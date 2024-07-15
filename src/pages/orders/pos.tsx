import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import UsersList from '@/components/user/user-list';
import LinkButton from '@/components/ui/link-button';
import { LIMIT } from '@/utils/constants';
import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';

import { Routes } from '@/config/routes';
import PageHeading from '@/components/common/page-heading';
import SalesProducts from '@/components/order/POS/sale-order';


export default function CreateProductPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');



  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={t('Punto de venta')} />
        </div>
      </Card>
      <SalesProducts/>

    </>
  );
}
CreateProductPage.authenticate = {
  permissions: adminOnly,
};
CreateProductPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
