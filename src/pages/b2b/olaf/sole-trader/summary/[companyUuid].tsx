import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import * as toast from 'core/atoms/toast/Toast';
import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import BusinessSummaryFormContainer from '../../../../../containers/BusinessSummaryFormContainer/BusinessSummaryFormContainer';
import SecureModalLayout from '../../../../../containers/SecureModalLayout';
import useGetPersonUuid from '../../../../../hooks/useGetPersonUuid';
import useSoleTraderJourney from '../../../../../hooks/useSoleTraderJourney';
import { GetDerivative_derivative as IDerivative } from '../../../../../../generated/GetDerivative';
import { pushSummaryDataLayer } from '../../../../../utils/dataLayerHelpers';
import {
  OrderInputObject,
  VehicleTypeEnum,
} from '../../../../../../generated/globalTypes';
import { useStoredOrderQuery } from '../../../../../gql/storedOrder';
import createApolloClient from '../../../../../apolloClient';
import { getServiceBannerData } from '../../../../../utils/serviceBannerHelper';
import { IHomePageContainer } from '../../../../../containers/HomePageContainer/HomePageContainer';
import {
  HomePageData,
  HomePageDataVariables,
} from '../../../../../../generated/HomePageData';
import { ALL_HOME_CONTENT } from '../../../../../gql/homepage';
import { getManufacturerJson } from '../../../../../utils/url';
import { specialOffersRequest } from '../../../../../utils/offers';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../../../../../generated/filterList';
import { GET_SEARCH_POD_DATA } from '../../../../../containers/SearchPodContainer/gql';
import { encodeData } from '../../../../../utils/data';

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
): Promise<GetServerSidePropsResult<IHomePageContainer>> {
  const client = createApolloClient({}, context);

  try {
    const [{ data }, migrationSlugs, { serviceBanner }] = await Promise.all([
      await client.query<HomePageData, HomePageDataVariables>({
        query: ALL_HOME_CONTENT,
        variables: {
          isPreview: !!context?.preview,
        },
      }),
      getManufacturerJson(),
      getServiceBannerData(client),
    ]);

    const {
      productsVanDerivatives,
      productsCarDerivatives,
      productsPickupDerivatives,
      productsCar,
      productsPickup,
      productsVan,
      vehicleListUrlData,
    } = await specialOffersRequest(client);
    const [
      { data: searchPodVansData },
      { data: searchPodCarsData },
    ] = await Promise.all([
      client.query<IFilterList, IFilterListVariables>({
        query: GET_SEARCH_POD_DATA,
        variables: {
          vehicleTypes: [VehicleTypeEnum.LCV],
        },
      }),
      client.query<IFilterList, IFilterListVariables>({
        query: GET_SEARCH_POD_DATA,
        variables: {
          vehicleTypes: [VehicleTypeEnum.CAR],
        },
      }),
    ]);

    return {
      props: {
        data: encodeData(data) || null,
        migrationSlugs: migrationSlugs || null,
        productsVanDerivatives: productsVanDerivatives || null,
        productsCarDerivatives: productsCarDerivatives || null,
        productsPickupDerivatives: productsPickupDerivatives || null,
        productsCar: productsCar || null,
        productsPickup: productsPickup || null,
        productsVan: productsVan || null,
        searchPodVansData: encodeData(searchPodVansData),
        searchPodCarsData: encodeData(searchPodCarsData),
        vehicleListUrlData: encodeData(vehicleListUrlData) || null,
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
