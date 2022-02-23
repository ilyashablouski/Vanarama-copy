import React from 'react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';
import createApolloClient from '../apolloClient';
import {
  HomePageData,
  HomePageDataVariables,
} from '../../generated/HomePageData';
import { ALL_HOME_CONTENT } from '../gql/homepage';
import HomePageContainer from '../containers/HomePageContainer';
import { IHomePageContainer } from '../containers/HomePageContainer/HomePageContainer';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { GET_SEARCH_POD_DATA } from '../containers/SearchPodContainer/gql';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../generated/filterList';
import { specialOffersRequest } from '../utils/offers';
import { decodeData, encodeData } from '../utils/data';
import { getManufacturerJson } from '../utils/url';

export const HomePage: NextPage<IHomePageContainer> = ({
  data,
  productsVanDerivatives,
  productsCarDerivatives,
  productsPickupDerivatives,
  productsCar,
  productsPickup,
  productsVan,
  searchPodVansData,
  searchPodCarsData,
  vehicleListUrlData,
}) => (
  <HomePageContainer
    data={decodeData(data)}
    productsCar={productsCar}
    productsPickup={productsPickup}
    productsVan={productsVan}
    productsVanDerivatives={productsVanDerivatives}
    productsCarDerivatives={productsCarDerivatives}
    productsPickupDerivatives={productsPickupDerivatives}
    searchPodVansData={decodeData(searchPodVansData)}
    searchPodCarsData={decodeData(searchPodCarsData)}
    vehicleListUrlData={decodeData(vehicleListUrlData)}
  />
);

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IHomePageContainer>> {
  const client = createApolloClient({}, context);

  try {
    const [{ data }, migrationSlugs] = await Promise.all([
      await client.query<HomePageData, HomePageDataVariables>({
        query: ALL_HOME_CONTENT,
        variables: {
          isPreview: !!context?.preview,
        },
      }),
      getManufacturerJson(),
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

export default HomePage;
