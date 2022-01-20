import { ApolloError } from '@apollo/client';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import React from 'react';
import createApolloClient from '../../../apolloClient';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import { evCarHubOffersRequest, IEvOffersData } from '../../../utils/offers';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import { convertErrorToProps } from '../../../utils/helpers';
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../../types/common';
import ElectricCarHubPageContainer from '../../../containers/ElectricCarHubPageContainer';
import {
  filterList as IFilterList,
  filterListVariables as IFilterListVariables,
} from '../../../../generated/filterList';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { decodeData, encodeData } from '../../../utils/data';
import { FuelTypeEnum } from '../../../../entities/global';

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
    searchPodCarsData: IFilterList;
  }
>;

const ECarsPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyCar,
  productsElectricOnlyCarDerivatives,
  productsHybridOnlyCar,
  productsHybridOnlyCarDerivatives,
  vehicleListUrlData,
  searchPodCarsData: searchPodCarsDataEncoded,
}) => {
  const searchPodCarsData = decodeData(searchPodCarsDataEncoded);

  return (
    <ElectricCarHubPageContainer
      data={data}
      pageType={PageTypeEnum.DEFAULT}
      productsElectricOnlyCar={productsElectricOnlyCar || null}
      productsElectricOnlyCarDerivatives={
        productsElectricOnlyCarDerivatives || null
      }
      productsHybridOnlyCar={productsHybridOnlyCar || null}
      productsHybridOnlyCarDerivatives={
        productsHybridOnlyCarDerivatives || null
      }
      vehicleListUrlData={vehicleListUrlData || null}
      searchPodCarsData={searchPodCarsData}
      dataUiTestId="electric-leasing-cars-page"
    />
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});
    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'electric-leasing/cars-temp',
        sectionsAsArray: true,
        isPreview: !!context?.preview,
      },
    });

    const { data: searchPodCarsData } = await client.query<
      IFilterList,
      IFilterListVariables
    >({
      query: GET_SEARCH_POD_DATA,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
        fuelTypes: [FuelTypeEnum.ELECTRIC],
      },
    });

    const {
      productsElectricOnlyCar,
      productsHybridOnlyCar,
      productsElectricOnlyCarDerivatives,
      productsHybridOnlyCarDerivatives,
      vehicleListUrlData,
    } = await evCarHubOffersRequest(client);

    return {
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        productsElectricOnlyCar: productsElectricOnlyCar || null,
        productsElectricOnlyCarDerivatives:
          productsElectricOnlyCarDerivatives || null,
        productsHybridOnlyCar: productsHybridOnlyCar || null,
        productsHybridOnlyCarDerivatives:
          productsHybridOnlyCarDerivatives || null,
        vehicleListUrlData: vehicleListUrlData || null,
        searchPodCarsData: encodeData(searchPodCarsData),
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default ECarsPage;
