import React from 'react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import * as toast from 'core/atoms/toast/Toast';
import { ApolloError } from '@apollo/client';
import SoleTraderCompanyDetailsFormContainer from '../../../../../containers/SoleTraderCompanyDetailsFormContainer';
import SecureModalLayout from '../../../../../containers/SecureModalLayout';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../../utils/url';
import useGetPersonUuid from '../../../../../hooks/useGetPersonUuid';
import { useStoredOrderQuery } from '../../../../../gql/storedOrder';
import createApolloClient from '../../../../../apolloClient';
import { getServiceBannerData } from '../../../../../utils/serviceBannerHelper';

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
    return router.push(url, url.replace('[companyUuid]', uuid));
  };

  return (
    <OLAFLayout>
      <SecureModalLayout>
        <SoleTraderCompanyDetailsFormContainer
          orderId={storedOrderData?.storedOrder?.order?.uuid || ''}
          companyUuid={companyUuid}
          personUuid={personUuid}
          onCompleted={handleSubmitCompletion}
          onError={handleSubmitError}
          isEdited={isEdited}
        />
      </SecureModalLayout>
    </OLAFLayout>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IOlafPageProps>> {
  const client = createApolloClient({}, context);

  try {
    const { serviceBanner } = await getServiceBannerData(client);

    return {
      props: {
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default SoleTraderCompanyDetailsPage;
