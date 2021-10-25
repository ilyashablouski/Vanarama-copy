import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from 'core/atoms/toast/Toast';
import DirectorDetailsFormContainer from '../../../../containers/DirectorDetailsFormContainer';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import useGetPersonUuid from '../../../../hooks/useGetPersonUuid';
import { useStoredOrderQuery } from '../../../../gql/storedOrder';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
  directorUuid: string;
};

export const DirectorDetailsPage: NextPage = () => {
  const router = useRouter();
  const { data: storedOrderData } = useStoredOrderQuery();
  const personUuid = useGetPersonUuid();
  const { companyUuid, directorUuid, redirect } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const url = redirect || `/b2b/olaf/company-bank-details/[companyUuid]`;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <DirectorDetailsFormContainer
        directorUuid={directorUuid}
        companyUuid={companyUuid}
        personUuid={personUuid}
        orderUuid={storedOrderData?.storedOrder?.order?.uuid || ''}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
      />
    </OLAFLayout>
  );
};

export default withApollo(DirectorDetailsPage, { getDataFromTree });
