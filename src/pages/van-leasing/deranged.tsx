import React from 'react';
import { NextPage } from 'next';
import { ApolloError } from '@apollo/client';
import { PreviewNextPageContext } from 'types/common';
import createApolloClient from '../../apolloClient';
import { decodeData, encodeData } from '../../utils/data';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';

import {
  GenericPageQuery,
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
import { FeatureFlags } from '../../utils/helpers';

interface IDerangedPage {
  genericPageData: IGenericPage;
  conversions: (ConversionsVehicleList | null)[] | null;
}

const DerangedPage: NextPage<IDerangedPage> = ({
  genericPageData,
  conversions,
}: IDerangedPage) => (
  <DerangedPageContainer
    genericPage={decodeData(genericPageData?.data)}
    conversions={conversions}
  />
);

export async function getServerSideProps(context: PreviewNextPageContext) {
  const isDerangedFeatureEnabled = context.req?.headers?.cookie?.includes(
    FeatureFlags.DERANGED,
  );

  if (!isDerangedFeatureEnabled) {
    return {
      notFound: true,
    };
  }

  try {
    const client = createApolloClient({}, context);

    const { data: genericPage } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
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
        genericPageData: {
          data: encodeData(genericPage),
        },
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
