import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import * as toast from 'core/atoms/toast/Toast';
import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../../layouts/OLAFLayout/OLAFLayout';
import BusinessSummaryFormContainer from '../../../../containers/BusinessSummaryFormContainer/BusinessSummaryFormContainer';
import SecureModalLayout from '../../../../containers/SecureModalLayout';
import useGetPersonUuid from '../../../../hooks/useGetPersonUuid';
import useSoleTraderJourney from '../../../../hooks/useSoleTraderJourney';
import { GetDerivative_derivative as IDerivative } from '../../../../../generated/GetDerivative';
import { pushSummaryDataLayer } from '../../../../utils/dataLayerHelpers';
import { OrderInputObject } from '../../../../../generated/globalTypes';
import { useStoredOrderQuery } from '../../../../gql/storedOrder';
import createApolloClient from '../../../../apolloClient';
import { getServiceBannerData } from '../../../../utils/serviceBannerHelper';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

type QueryParams = {
  companyUuid: string;
};

const BusinessSummaryPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid } = router.query as QueryParams;
  const { data: storedOrderData } = useStoredOrderQuery();
  const personUuid = useGetPersonUuid();
  const isSoleTrader = useSoleTraderJourney();
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [derivativeData, setDerivativeData] = useState<IDerivative | null>(
    null,
  );

  const handleComplete = (emailAddress: string | undefined) => {
    router.push('/olaf/thank-you?isB2b=1', '/olaf/thank-you?isB2b=1').then(() =>
      setTimeout(() => {
        pushSummaryDataLayer({
          detailsData,
          derivativeData,
          orderId: storedOrderData?.storedOrder?.order?.uuid || '',
          emailAddress,
        });
      }, 200),
    );
  };

  return (
    <OLAFLayout
      setDetailsData={setDetailsData}
      setDerivativeData={setDerivativeData}
    >
      <SecureModalLayout>
        <BusinessSummaryFormContainer
          isSoleTrader={isSoleTrader}
          onComplete={handleComplete}
          onError={handleSubmitError}
          personUuid={personUuid}
          orderId={storedOrderData?.storedOrder?.order?.uuid || ''}
          companyUuid={companyUuid}
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

export default BusinessSummaryPage;
