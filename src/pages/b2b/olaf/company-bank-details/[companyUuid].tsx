import CompanyBankDetailsFormContainer from '../../../../containers/CompanyBankDetailsFormContainer/CompanyBankDetailsFormContainer';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { OLAFQueryParams, getUrlParam } from '../../../../utils/url';

import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';



type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

const CompanyBankDetailsPage: NextPage = () => {
  const router = useRouter();
  const { derivativeId, orderId, companyUuid } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <CompanyBankDetailsFormContainer
        onCompleted={() => {
          const params = getUrlParam({ derivativeId, orderId });
          const url = `/b2b/olaf/summary/[companyUuid]${params}`;
          router.push(url, url.replace('[companyUuid]', companyUuid));
        }}
        companyUuid={companyUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyBankDetailsPage, { getDataFromTree });