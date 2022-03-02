import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from 'core/atoms/toast/Toast';
import { ApolloError } from '@apollo/client';
import CompanyBankDetailsFormContainer from '../../../../../containers/CompanyBankDetailsFormContainer/CompanyBankDetailsFormContainer';
import SecureModalLayout from '../../../../../containers/SecureModalLayout';
import { OLAFQueryParams } from '../../../../../utils/url';
import useSoleTraderJorney from '../../../../../hooks/useSoleTraderJourney';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../../../layouts/OLAFLayout/OLAFLayout';
import useGetPersonUuid from '../../../../../hooks/useGetPersonUuid';
import { useStoredOrderQuery } from '../../../../../gql/storedOrder';
import createApolloClient from '../../../../../apolloClient';
import { getServiceBannerData } from '../../../../../utils/serviceBannerHelper';

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
      <SecureModalLayout>
        <CompanyBankDetailsFormContainer
          personUuid={personUuid}
          isSoleTrader={isSoleTraderJourney}
          isEdited={!!redirect}
          companyUuid={companyUuid}
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

export default CompanyBankDetailsPage;
