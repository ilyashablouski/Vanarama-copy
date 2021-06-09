import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../../apolloClient';
import { GET_SEARCH_POD_DATA } from '../../../../containers/SearchPodContainer/gql';
import {
  getCapsIds,
  RESULTS_PER_REQUEST,
  sortObjectGenerator,
  ssrCMSQueryExecutor,
} from '../../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../../containers/SearchPageContainer';
import { GET_VEHICLE_LIST } from '../../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../../containers/CustomerAlsoViewedContainer/gql';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  SortObject,
  VehicleTypeEnum,
} from '../../../../../generated/globalTypes';
import { vehicleList } from '../../../../../generated/vehicleList';
import { GetProductCard } from '../../../../../generated/GetProductCard';
import { filterList_filterList as IFilterList } from '../../../../../generated/filterList';
import { notFoundPageHandler } from '../../../../utils/url';
import { ISearchPageProps } from '../../../../models/ISearchPageProps';
import PageNotFoundContainer from '../../../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { decodeData, encodeData } from '../../../../utils/data';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
  filtersData?: IFilterList | undefined;
  makeParam: string;
  rangeParam?: string;
  defaultSort?: SortObject[];
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  filtersData,
  vehiclesList: encodedData,
  productCardsData: productEncodedData,
  responseCapIds,
  error,
  notFoundPageData,
  rangeParam,
  makeParam,
  defaultSort,
}) => {
  const router = useRouter();
  // De-obfuscate data for user
  const vehiclesList = decodeData(encodedData);
  const productCardsData = decodeData(productEncodedData);

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

  if (error) {
    return (
      <PageNotFoundContainer
        featured={notFoundPageData?.featured}
        cards={notFoundPageData?.cards}
        name={notFoundPageData?.name}
      />
    );
  }

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
      preloadMake={makeParam}
      preloadRange={rangeParam}
      defaultSort={defaultSort}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  const { query } = context;
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  let defaultSort;
  try {
    const contextData = {
      req: {
        url: context.req?.url || '',
      },
      query: { ...context.query },
    };
    const { data, errors } = (await ssrCMSQueryExecutor(
      client,
      contextData,
      true,
      'isModelPage',
    )) as ApolloQueryResult<GenericPageQuery>;
    const { data: filtersData } = await client.query({
      query: GET_SEARCH_POD_DATA,
      variables: {
        onOffer: null,
        vehicleTypes: [VehicleTypeEnum.CAR],
        manufacturerSlug: (query?.dynamicParam as string).toLowerCase(),
        rangeSlug: (query?.rangeName as string).toLowerCase(),
        bodyStyles: [(context?.query?.bodyStyles as string).replace('-', ' ')],
      },
    });
    defaultSort = sortObjectGenerator([
      {
        field: SortField.offerRanking,
        direction: SortDirection.ASC,
      },
      {
        field: SortField.availability,
        direction: SortDirection.ASC,
      },
    ]);
    if (Object.keys(context.query).length === 3) {
      vehiclesList = await client
        .query({
          query: GET_VEHICLE_LIST,
          variables: {
            vehicleTypes: [VehicleTypeEnum.CAR],
            leaseType: LeaseTypeEnum.PERSONAL,
            onOffer: null,
            first: RESULTS_PER_REQUEST,
            sort: defaultSort,
            manufacturerSlug: (context?.query
              ?.dynamicParam as string).toLowerCase(),
            rangeSlug: (context?.query?.rangeName as string).toLowerCase(),
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
    query.make = (query.dynamicParam as string).toLowerCase();

    // Obfuscate data from Googlebot
    const vehiclesListData = encodeData(vehiclesList);
    const productCards = encodeData(productCardsData);
    return {
      props: {
        pageData: data,
        metaData: data?.genericPage.metaData || null,
        isServer: !!context.req,
        filtersData: filtersData?.filterList || null,
        vehiclesList: vehiclesListData || null,
        productCardsData: productCards || null,
        responseCapIds: responseCapIds || null,
        error: errors ? errors[0] : null,
        defaultSort: defaultSort || null,
        makeParam: (context?.query?.dynamicParam as string).toLowerCase(),
        rangeParam: (context?.query?.rangeName as string).toLowerCase(),
      },
    };
  } catch {
    const { res } = context;
    if (res) {
      return notFoundPageHandler(res, client);
    }
    return {
      props: {
        error: true,
      },
    };
  }
}

export default Page;
