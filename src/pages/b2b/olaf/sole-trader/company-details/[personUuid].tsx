import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SoleTraderCompanyDetailsFormContainer from '../../../../../containers/SoleTraderCompanyDetailsFormContainer';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams, getUrlParam } from '../../../../../utils/url';

export const CompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const { orderId, personUuid } = router.query as OLAFQueryParams;

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ orderId });
    const url = `/b2b/olaf/vat-details/[personUuid]${params}`;
    router.push(url, url.replace('[personUuid]', personUuid));
  };

  return (
    <OLAFLayout>
      <SoleTraderCompanyDetailsFormContainer
        orderId={orderId}
        onCompleted={handleSubmitCompletion}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyDetailsPage, {
  getDataFromTree,
});
