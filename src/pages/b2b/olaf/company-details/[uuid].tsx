import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import CompanyDetailsForm from '../../../../components/CompanyDetailsForm/CompanyDetailsForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

export const CompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { derivativeId, orderId },
  } = router;

  return (
    <OLAFLayout
      orderId={orderId as string}
      derivativeId={derivativeId as string}
    >
      <CompanyDetailsForm />
    </OLAFLayout>
  );
};

export default withApollo(CompanyDetailsPage, {
  getDataFromTree,
});
