import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SoleTraderDetailsFormContainer from '../../../../../containers/SoleTraderDetailsFormContainer';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams, getUrlParam } from '../../../../../utils/url';

export const SoleTraderDetailsPage: NextPage = () => {
  const router = useRouter();
  const { orderId, personUuid } = router.query as OLAFQueryParams;

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ orderId });
    const url = `/b2b/olaf/sole-trader/bank-details/[personUuid]${params}`;
    router.push(url, url.replace('[personUuid]', personUuid));
  };

  return (
    <OLAFLayout>
      <SoleTraderDetailsFormContainer
        orderUuid={orderId}
        personUuid={personUuid}
        onCompleted={handleSubmitCompletion}
        onError={() => false}
        isEdited={router.query.redirect === 'summary'}
      />
    </OLAFLayout>
  );
};

export default withApollo(SoleTraderDetailsPage, {
  getDataFromTree,
});
