import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from 'core/atoms/toast/Toast';
import CompanyBankDetailsFormContainer from '../../../../containers/CompanyBankDetailsFormContainer/CompanyBankDetailsFormContainer';
import { OLAFQueryParams } from '../../../../utils/url';
import useSoleTraderJorney from '../../../../hooks/useSoleTraderJourney';

import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import useGetPersonUuid from '../../../../hooks/useGetPersonUuid';
import { useStoredOrderQuery } from '../../../../gql/storedOrder';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

const CompanyBankDetailsPage: NextPage = () => {
  const router = useRouter();
  const isSoleTraderJourney = useSoleTraderJorney();
  const { data: storedOrderData } = useStoredOrderQuery();
  const personUuid = useGetPersonUuid();
  const { companyUuid, redirect } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const summaryUrl = !isSoleTraderJourney
      ? '/b2b/olaf/summary/[companyUuid]'
      : '/b2b/olaf/sole-trader/summary/[companyUuid]';
    return router.push(
      summaryUrl,
      summaryUrl.replace('[companyUuid]', companyUuid),
    );
  };

  return (
    <OLAFLayout>
      <CompanyBankDetailsFormContainer
        personUuid={personUuid}
        isSoleTrader={isSoleTraderJourney}
        isEdited={!!redirect}
        companyUuid={companyUuid}
        orderUuid={storedOrderData?.storedOrder?.order?.uuid || ''}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
      />
    </OLAFLayout>
  );
};

export default CompanyBankDetailsPage;
