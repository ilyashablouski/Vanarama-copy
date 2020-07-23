import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SoleTraderCompanyDetailsFormContainer from '../../../../../containers/SoleTraderCompanyDetailsFormContainer';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../../utils/url';

type QueryParams = OLAFQueryParams & {
  personUuid: string;
};

export const CompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const { orderId } = router.query as QueryParams;

  return (
    <OLAFLayout>
      <SoleTraderCompanyDetailsFormContainer
        orderId={orderId}
        onCompleted={() => {
          const url = `/b2b/olaf/sole-trader/vat-details/`;
          router.push(url);
        }}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyDetailsPage, {
  getDataFromTree,
});
