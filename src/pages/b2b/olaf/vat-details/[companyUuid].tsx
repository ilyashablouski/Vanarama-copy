import { getDataFromTree } from '@apollo/react-ssr';
import * as toast from 'core/atoms/toast/Toast';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import VatDetailsFormContainer from '../../../../containers/VatDetailsFormContainer';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import useSoleTraderJorney from '../../../../hooks/useSoleTraderJourney';
import useGetPersonUuid from '../../../../hooks/useGetPersonUuid';
import { useStoredOrderQuery } from '../../../../gql/storedOrder';

const handleSubmitError = () => {
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );
};

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const VatDetailsPage: NextPage = () => {
  const router = useRouter();
  const isSoleTraderJourney = useSoleTraderJorney();
  const { data: storedOrderData } = useStoredOrderQuery();
  const personUuid = useGetPersonUuid();
  const { companyUuid, redirect } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const detailsUrl = !isSoleTraderJourney
      ? `/b2b/olaf/director-details/[companyUuid]`
      : `/b2b/olaf/sole-trader/sole-trader-details/[companyUuid]`;
    const url = redirect || detailsUrl;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <VatDetailsFormContainer
        personUuid={personUuid}
        isSoleTrader={isSoleTraderJourney}
        orderId={storedOrderData?.storedOrder?.order?.uuid || ''}
        companyUuid={companyUuid}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
        isEdited={!!redirect}
      />
    </OLAFLayout>
  );
};

export default withApollo(VatDetailsPage, { getDataFromTree });
