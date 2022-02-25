import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from 'core/atoms/toast/Toast';
import { ApolloError } from '@apollo/client';
import DirectorDetailsFormContainer from '../../../../containers/DirectorDetailsFormContainer';
import SecureModalLayout from '../../../../containers/SecureModalLayout';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import useGetPersonUuid from '../../../../hooks/useGetPersonUuid';
import { useStoredOrderQuery } from '../../../../gql/storedOrder';
import createApolloClient from '../../../../apolloClient';
import { getServiceBannerData } from '../../../../utils/serviceBannerHelper';

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
    return router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <SecureModalLayout>
        <DirectorDetailsFormContainer
          directorUuid={directorUuid}
          companyUuid={companyUuid}
          personUuid={personUuid}
          orderUuid={storedOrderData?.storedOrder?.order?.uuid || ''}
          onCompleted={handleSubmitCompletion}
          onError={handleSubmitError}
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

export default DirectorDetailsPage;
