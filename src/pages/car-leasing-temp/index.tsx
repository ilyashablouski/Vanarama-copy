import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';
import React from 'react';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import { isRedesignCarHubFeatureFlagEnabled } from '../../utils/helpers';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import { GENERIC_PAGE } from '../../gql/genericPage';
import createApolloClient from '../../apolloClient';
import CarHubPageContainer from '../../containers/CarHubPageContainer';
import { PageTypeEnum } from '../../types/common';
import { carsPageOffersRequest, ICarsPageOffersData } from '../../utils/offers';
import { decodeData, encodeData } from '../../utils/data';
import { getManufacturerJson } from '../../utils/url';
import { getServiceBannerData } from '../../utils/serviceBannerHelper';

interface IProps extends ICarsPageOffersData {
  data: GenericPageQuery;
  serviceBanner?: IServiceBanner;
}

export const CarsPage: NextPage<IProps> = ({ data: encodedData }) => {
  const decodedData: GenericPageQuery = decodeData(encodedData);
  return (
    <CarHubPageContainer data={decodedData} pageType={PageTypeEnum.DEFAULT} />
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({});
  try {
    const isFeatureFlagEnabled = isRedesignCarHubFeatureFlagEnabled(
      context.req.headers.cookie,
    );
    if (!isFeatureFlagEnabled) {
      return { notFound: true };
    }
    const [{ data }, migrationSlugs, { serviceBanner }] = await Promise.all([
      client.query<GenericPageQuery, GenericPageQueryVariables>({
        query: GENERIC_PAGE,
        variables: {
          slug: 'car-leasing-dummy',
          sectionsAsArray: true,
          isPreview: !!context?.preview,
        },
      }),
      getManufacturerJson(),
      getServiceBannerData(client),
    ]);

    const { productsCar, vehicleListUrlData } = await carsPageOffersRequest(
      client,
    );

    return {
      props: {
        data: encodeData(data),
        migrationSlugs: migrationSlugs || null,
        productsCar: productsCar || null,
        vehicleListUrlData: encodeData(vehicleListUrlData),
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

export default CarsPage;
