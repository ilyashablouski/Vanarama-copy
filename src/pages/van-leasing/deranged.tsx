import React from 'react';
import DefaultErrorPage from 'next/error';

import Head from 'components/Head';

import { PreviewNextPageContext } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import { decodeData, encodeData } from '../../utils/data';
import { getSectionsData } from '../../utils/getSectionsData';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';

import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import DerangedPageContainer from '../../containers/DerangedPageContainer/DerangedPageContainer';
import { isDerangedHubFeatureEnabled } from '../../utils/helpers';
import {
  GetConversionsCarList,
  GetConversionsCarListVariables,
} from '../../../generated/GetConversionsCarList';
import { GET_CONVERSIONS_CAR_LIST } from '../../gql/conversions';
import {
  ConversionTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';

interface IDerangedPage {
  genericPageData: IGenericPage;
  derangedCarList: GetConversionsCarList;
}

function DerangedPage({ genericPageData, derangedCarList }: IDerangedPage) {
  if (
    genericPageData.error ||
    !genericPageData.data ||
    !isDerangedHubFeatureEnabled()
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
        derangedCarList={derangedCarList}
      />
    </>
  );
}

export async function getStaticProps(context: PreviewNextPageContext) {
  try {
    const client = createApolloClient({}, context);
    const { data: genericPage, errors } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'van-leasing/deranged',
        ...(!!context?.preview && { isPreview: context.preview }),
      },
    });

    const { data: derangedCarList } = await client.query<
      GetConversionsCarList,
      GetConversionsCarListVariables
    >({
      query: GET_CONVERSIONS_CAR_LIST,
      variables: {
        conversionsVehicleType: VehicleTypeEnum.LCV,
        conversionsConversionTypes: [ConversionTypeEnum.DERANGED],
      },
    });

    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL) ||
          Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        genericPageData: {
          data: encodeData(genericPage),
          error: errors ? errors[0] : null,
        },
        derangedCarList,
      },
    };
  } catch (error) {
    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
        Number(DEFAULT_REVALIDATE_INTERVAL_ERROR),
      props: {
        error,
      },
    };
  }
}

export default DerangedPage;
