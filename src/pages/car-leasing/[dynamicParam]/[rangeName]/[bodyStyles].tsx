import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../../apolloClient';
import { GET_SEARCH_POD_DATA } from '../../../../containers/SearchPodContainer/gql';
import {
  getCapsIds,
  ssrCMSQueryExecutor,
} from '../../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../../containers/SearchPageContainer';
import { GET_VEHICLE_LIST } from '../../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../../containers/CustomerAlsoViewedContainer/gql';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../../../generated/GenericPageQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../../../generated/globalTypes';
import { vehicleList } from '../../../../../generated/vehicleList';
import { GetProductCard } from '../../../../../generated/GetProductCard';
import { filterList_filterList as IFilterList } from '../../../../../generated/filterList';

interface IProps {
  isServer: boolean;
  pageData: GenericPageQuery;
  metaData: PageMetaData;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
  filtersData?: IFilterList | undefined;
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  filtersData,
  vehiclesList,
  productCardsData,
  responseCapIds,
}) => {
  const router = useRouter();
  useEffect(() => {
    if (!router.query.make) {
      const query = { ...router.query, make: router.query.dynamicParam };
      const { asPath, pathname } = router;
      router.replace(
        {
          pathname,
          query,
        },
        asPath,
        { shallow: true },
      );
    }
    // it's should executed only when page init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch
      isModelPage
      pageData={pageData}
      metaData={metaData}
      preLoadFiltersData={filtersData}
      preLoadVehiclesList={vehiclesList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    true,
    'isModelPage',
  )) as ApolloQueryResult<any>;
  const { data: filtersData } = await client.query({
    query: GET_SEARCH_POD_DATA,
    variables: {
      onOffer: null,
      vehicleTypes: [VehicleTypeEnum.CAR],
    },
  });
  if (Object.keys(context.query).length === 3) {
    vehiclesList = await client
      .query({
        query: GET_VEHICLE_LIST,
        variables: {
          vehicleTypes: [VehicleTypeEnum.CAR],
          leaseType: LeaseTypeEnum.PERSONAL,
          onOffer: null,
          first: 9,
          sortField: SortField.availability,
          sortDirection: SortDirection.ASC,
          manufacturerName: context?.query?.dynamicParam,
          rangeName: context?.query?.rangeName,
          bodyStyles: [
            (context?.query?.bodyStyles as string).replace('-', ' '),
          ],
        },
      })
      .then(resp => resp.data);
    try {
      responseCapIds = getCapsIds(vehiclesList.vehicleList?.edges || []);
      if (responseCapIds.length) {
        productCardsData = await client
          .query({
            query: GET_PRODUCT_CARDS_DATA,
            variables: {
              capIds: responseCapIds,
              vehicleType: VehicleTypeEnum.CAR,
            },
          })
          .then(resp => resp.data);
      }
    } catch {
      return false;
    }
  }
  return {
    props: {
      pageData: data,
      metaData: data.genericPage.metaData,
      isServer: !!context.req,
      filtersData: filtersData?.filterList || null,
      vehiclesList: vehiclesList || null,
      productCardsData: productCardsData || null,
      responseCapIds: responseCapIds || null,
    },
  };
}

export default Page;
