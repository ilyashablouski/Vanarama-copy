import React from 'react';
import DefaultErrorPage from 'next/error';
import { NextPage } from 'next';
import Head from 'components/Head';
import { PreviewNextPageContext } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import { decodeData, encodeData } from '../../utils/data';
import { getSectionsData } from '../../utils/getSectionsData';
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
  GetConversionsVehicleListVariables,
} from '../../../generated/GetConversionsVehicleList';

interface IDerangedPage {
  genericPageData: IGenericPage;
  derangedVehicleList: GetConversionsVehicleList;
  isFeatureFlag: boolean;
}

const DerangedPage: NextPage<IDerangedPage> = ({
  genericPageData,
  derangedVehicleList,
  isFeatureFlag,
}: IDerangedPage) => {
  if (
    !isFeatureFlag ||
    genericPageData.error ||
    !genericPageData.data ||
    !derangedVehicleList
  ) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const pageData = decodeData(genericPageData.data);
  const metaData = getSectionsData(['metaData'], pageData.genericPage);
  const schema = getSectionsData(
    ['metaData', 'schema'],
    pageData.genericPage.metaData,
  );

  return (
    <>
      {metaData && <Head metaData={metaData} />}
      {schema && <SchemaJSON json={JSON.stringify(schema)} />}
      <DerangedPageContainer
        pageData={pageData}
        derangedVehicleList={derangedVehicleList}
      />
    </>
  );
};

export async function getServerSideProps(context: PreviewNextPageContext) {
  const client = createApolloClient({}, context);

  const cookie = context.req?.headers?.cookie
    ?.split(';')
    .map(item => item.trim())
    .includes('DIG-7592=1');

  if (!cookie) {
    return {
      props: {
        isFeatureFlag: false,
      },
    };
  }

  try {
    const { data: genericPage } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'van-leasing/deranged',
        ...(!!context?.preview && { isPreview: context.preview }),
      },
    });

    const { data: conversions } = await client.query<
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
        derangedVehicleList: conversions,
        isFeatureFlag: true,
      },
    };
  } catch (error) {
    return false;
  }
}

export default DerangedPage;
