import React from 'react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';

import {
  SortField,
  LeaseTypeEnum,
  SortDirection,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../generated/vehicleList';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../generated/GetProductCard';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
  GenericPageQuery_genericPage as IGenericPage,
} from '../../../generated/GenericPageQuery';
import { Nullable } from '../../types/common';

import {
  getCapsIds,
  RESULTS_PER_REQUEST,
} from '../../containers/SearchPageContainer/helpers';
import { GET_VEHICLE_LIST } from '../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../containers/CustomerAlsoViewedContainer/gql';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE } from '../../gql/genericPage';
import { decodeData, encodeData } from '../../utils/data';

import LevcPageContainer from '../../containers/LevcPageContainer';

interface ILevcPage {
  vehiclesData: Nullable<vehicleList>;
  productCardsData: Nullable<GetProductCard>;
  genericPage: IGenericPage;
}

const LevcPage: NextPage<ILevcPage> = ({
  genericPage,
  vehiclesData,
  productCardsData,
}) => (
  <LevcPageContainer
    vehiclesData={decodeData(vehiclesData)}
    productCardsData={decodeData(productCardsData)}
    genericPage={decodeData(genericPage)}
  />
);

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<ILevcPage>> {
  try {
    const client = createApolloClient({}, context);

    const {
      data: { genericPage },
    } = await client.query<GenericPageQuery, GenericPageQueryVariables>({
      query: GENERIC_PAGE,
      variables: {
        slug: 'van-leasing/levc',
        pageType: 'levcManufacturer',
        isPreview: !!context?.preview,
      },
    });

    const vehiclesData = await client
      .query<vehicleList, vehicleListVariables>({
        query: GET_VEHICLE_LIST,
        variables: {
          manufacturerSlug: 'levc',
          vehicleTypes: [VehicleTypeEnum.LCV],
          leaseType: LeaseTypeEnum.BUSINESS,
          first: RESULTS_PER_REQUEST,
          sort: [
            {
              field: SortField.offerRanking,
              direction: SortDirection.ASC,
            },
          ],
        },
      })
      .then(resp => resp.data);

    let productCardsData: GetProductCard | undefined;
    const responseCapIds = getCapsIds(vehiclesData.vehicleList?.edges || []);

    if (responseCapIds.length) {
      productCardsData = await client
        .query<GetProductCard, GetProductCardVariables>({
          query: GET_PRODUCT_CARDS_DATA,
          variables: {
            capIds: responseCapIds,
            vehicleType: VehicleTypeEnum.LCV,
          },
        })
        .then(resp => resp.data);
    }

    return {
      props: {
        genericPage: encodeData(genericPage),
        vehiclesData: vehiclesData ? encodeData(vehiclesData) : null,
        productCardsData: productCardsData
          ? encodeData(productCardsData)
          : null,
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

export default LevcPage;
