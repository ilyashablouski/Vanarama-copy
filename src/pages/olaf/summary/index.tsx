import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import SummaryFormContainer from '../../../containers/SummaryFormContainer/SummaryFormContainer';
import { OLAFQueryParams } from '../../../utils/url';
import { GetDerivative_derivative as IDerivative } from '../../../../generated/GetDerivative';
import { pushSummaryDataLayer } from '../../../utils/dataLayerHelpers';
import { OrderInputObject } from '../../../../generated/globalTypes';
import { useStoredOrderQuery } from '../../../gql/storedOrder';
import {
  IPageWithError,
  IPageWithoutData,
  PageTypeEnum,
} from '../../../types/common';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';

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

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IPageWithoutData | IPageWithError>> {
  try {
    const client = createApolloClient({});

    const { serviceBanner } = await getServiceBannerData(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default SummaryPage;
