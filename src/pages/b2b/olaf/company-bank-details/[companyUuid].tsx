import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import CompanyBankDetailsFormContainer from '../../../../containers/CompanyBankDetailsFormContainer/CompanyBankDetailsFormContainer';
import { OLAFQueryParams, getUrlParam } from '../../../../utils/url';

import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

const CompanyBankDetailsPage: NextPage = () => {
  const router = useRouter();
  const { orderId, companyUuid } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ orderId });
    const url = `/b2b/olaf/summary/[companyUuid]${params}`;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <CompanyBankDetailsFormContainer
        isEdited={router.query.redirect === 'summary'}
        companyUuid={companyUuid}
        orderUuid={orderId}
        onCompleted={handleSubmitCompletion}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyBankDetailsPage, { getDataFromTree });
