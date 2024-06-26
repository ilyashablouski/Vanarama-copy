import React from 'react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError } from '@apollo/client';
import createApolloClient from '../../apolloClient';
import { decodeData, encodeData } from '../../utils/data';
import { GENERIC_PAGE } from '../../gql/genericPage';

import {
  GenericPageQuery,
  GenericPageQuery_genericPage as IGenericPage,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import DerangedPageContainer from '../../containers/DerangedPageContainer/DerangedPageContainer';
import { GET_CONVERSIONS_VEHICLE_LIST } from '../../gql/conversions';
import {
  ConversionTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  GetConversionsVehicleList,
  GetConversionsVehicleList_conversions as ConversionsVehicleList,
  GetConversionsVehicleListVariables,
} from '../../../generated/GetConversionsVehicleList';

interface IDerangedPage {
  data: IGenericPage;
  conversions: (ConversionsVehicleList | null)[] | null;
}

const DerangedPage: NextPage<IDerangedPage> = ({
  data,
  conversions,
}: IDerangedPage) => (
  <DerangedPageContainer
    genericPage={decodeData(data)}
    conversions={conversions}
  />
);

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IDerangedPage>> {
  try {
    const client = createApolloClient({}, context);

    const {
      data: { genericPage },
    } = await client.query<GenericPageQuery, GenericPageQueryVariables>({
      query: GENERIC_PAGE,
      variables: {
        slug: 'van-leasing/deranged',
        isPreview: !!context?.preview,
      },
    });

    const {
      data: { conversions },
    } = await client.query<
      GetConversionsVehicleList,
      GetConversionsVehicleListVariables
    >({
      query: GET_CONVERSIONS_VEHICLE_LIST,
      variables: {
        conversionsVehicleType: VehicleTypeEnum.LCV,
        conversionsConversionTypes: [ConversionTypeEnum.DERANGED],
      },
    });

    return {
      props: {
        data: encodeData(genericPage),
        conversions,
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

export default DerangedPage;
