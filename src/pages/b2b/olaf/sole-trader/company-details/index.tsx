import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from 'core/atoms/toast/Toast';
import SoleTraderCompanyDetailsFormContainer from '../../../../../containers/SoleTraderCompanyDetailsFormContainer';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../../utils/url';
import useGetPersonUuid from '../../../../../hooks/useGetPersonUuid';
import { useStoredOrderQuery } from '../../../../../gql/storedOrder';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
    { dataTestId: 'company-details-error' },
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const SoleTraderCompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const { data: storedOrderData } = useStoredOrderQuery();
  const personUuid = useGetPersonUuid();
  const { companyUuid, redirect } = router.query as QueryParams;
  const isEdited = !!redirect;

  const handleSubmitCompletion = (uuid: string) => {
    const url = redirect || `/b2b/olaf/sole-trader/vat-details/[companyUuid]`;
    router.push(url, url.replace('[companyUuid]', uuid));
  };

  return (
    <OLAFLayout>
      <SoleTraderCompanyDetailsFormContainer
        orderId={storedOrderData?.storedOrder?.order?.uuid || ''}
        companyUuid={companyUuid}
        personUuid={personUuid}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
        isEdited={isEdited}
      />
    </OLAFLayout>
  );
};

export default SoleTraderCompanyDetailsPage;
