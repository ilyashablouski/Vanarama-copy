import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../layouts/OLAFLayout/OLAFLayout';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import SummaryFormContainer from '../../../containers/SummaryFormContainer/SummaryFormContainer';
import { OLAFQueryParams } from '../../../utils/url';
import { GetDerivative_derivative as IDerivative } from '../../../../generated/GetDerivative';
import { pushSummaryDataLayer } from '../../../utils/dataLayerHelpers';
import { OrderInputObject } from '../../../../generated/globalTypes';
import { useStoredOrderQuery } from '../../../gql/storedOrder';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;
  const { data: storedOrderData } = useStoredOrderQuery();
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [derivativeData, setDerivativeData] = useState<IDerivative | null>(
    null,
  );
  const personUuid =
    uuid || storedOrderData?.storedOrder?.order?.personUuid || '';

  const handleComplete = (emailAddress: string | undefined) => {
    router.push('/olaf/thank-you', '/olaf/thank-you').then(() =>
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
        <SummaryFormContainer
          onComplete={handleComplete}
          personUuid={personUuid}
          orderId={storedOrderData?.storedOrder?.order?.uuid || ''}
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

export default SummaryPage;
