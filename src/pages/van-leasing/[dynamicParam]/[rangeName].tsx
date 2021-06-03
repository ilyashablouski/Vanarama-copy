import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../apolloClient';
import { GET_VEHICLE_LIST } from '../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import {
  getCapsIds,
  RESULTS_PER_REQUEST,
  sortObjectGenerator,
  ssrCMSQueryExecutor,
} from '../../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  SortObject,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { GetProductCard } from '../../../../generated/GetProductCard';
import { vehicleList } from '../../../../generated/vehicleList';
import { notFoundPageHandler } from '../../../utils/url';
import { ISearchPageProps } from '../../../models/ISearchPageProps';
import PageNotFoundContainer from '../../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import { filterList_filterList as IFilterList } from '../../../../generated/filterList';
import { decodeData, encodeData } from '../../../utils/data';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
  filtersData?: IFilterList | undefined;
  topOffersList?: vehicleList;
  topOffersCardsData?: GetProductCard;
  defaultSort?: SortObject[];
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  responseCapIds,
  error,
  notFoundPageData,
  filtersData,
  vehiclesList: encodedData,
  productCardsData: productEncodedData,
  topOffersList: topOffersListEncodedData,
  topOffersCardsData: topOffersCardsEncodedData,
  defaultSort,
}) => {
  const router = useRouter();
  // De-obfuscate data for user
  const vehiclesList = decodeData(encodedData);
  const productCardsData = decodeData(productEncodedData);
  const topOffersList = decodeData(topOffersListEncodedData);
  const topOffersCardsData = decodeData(topOffersCardsEncodedData);

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
      isCarSearch={false}
      isRangePage
      metaData={metaData}
      pageData={pageData}
      preLoadVehiclesList={vehiclesList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
      preLoadFiltersData={filtersData}
      preLoadTopOffersList={topOffersList}
      preLoadTopOffersCardsData={topOffersCardsData}
      defaultSort={defaultSort}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  let topOffersCardsData;
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
      false,
      'isRangePage',
    )) as ApolloQueryResult<GenericPageQuery>;
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
    // should contain only 2 routs params(make, range)
    if (Object.keys(context.query).length === 2) {
      vehiclesList = await client
        .query({
          query: GET_VEHICLE_LIST,
          variables: {
            vehicleTypes: [VehicleTypeEnum.LCV],
            leaseType: LeaseTypeEnum.BUSINESS,
            onOffer: null,
            first: RESULTS_PER_REQUEST,
            sort: defaultSort,
            manufacturerSlug: (context?.query
              ?.dynamicParam as string).toLowerCase(),
            rangeSlug: (context?.query?.rangeName as string).toLowerCase(),
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
                vehicleType: VehicleTypeEnum.LCV,
              },
            })
            .then(resp => resp.data);
        }
      } catch {
        return false;
      }
    }
    const { data: filtersData } = await client.query({
      query: GET_SEARCH_POD_DATA,
      variables: {
        onOffer: null,
        vehicleTypes: [VehicleTypeEnum.LCV],
        manufacturerSlug: (context?.query
          ?.dynamicParam as string).toLowerCase(),
        rangeSlug: (context?.query?.rangeName as string).toLowerCase(),
      },
    });
    const topOffersList = await client
      .query({
        query: GET_VEHICLE_LIST,
        variables: {
          vehicleTypes: [VehicleTypeEnum.LCV],
          leaseType: LeaseTypeEnum.PERSONAL,
          onOffer: true,
          first: 9,
          sort: [
            { field: SortField.offerRanking, direction: SortDirection.ASC },
          ],
          manufacturerSlug: (context?.query
            ?.dynamicParam as string).toLowerCase(),
          rangeSlug: (context?.query?.rangeName as string).toLowerCase(),
        },
      })
      .then(resp => resp.data);
    const topOffersListCapIds = getCapsIds(
      topOffersList.vehicleList?.edges || [],
    );
    if (topOffersListCapIds.length) {
      topOffersCardsData = await client
        .query({
          query: GET_PRODUCT_CARDS_DATA,
          variables: {
            capIds: topOffersListCapIds,
            vehicleType: VehicleTypeEnum.LCV,
          },
        })
        .then(resp => resp.data);
    }
    context.query.make = (context?.query?.dynamicParam as string).toLowerCase();
    return {
      props: {
        pageData: data,
        metaData: data?.genericPage.metaData || null,
        isServer: !!context.req,
        responseCapIds: responseCapIds || null,
        error: errors ? errors[0] : null,
        filtersData: filtersData?.filterList || null,
        vehiclesList: encodeData(vehiclesList) || null,
        productCardsData: encodeData(productCardsData) || null,
        topOffersList: encodeData(topOffersList) || null,
        topOffersCardsData: encodeData(topOffersCardsData) || null,
        defaultSort: defaultSort || null,
      },
    };
  } catch {
    const { res } = context;
    if (res) return notFoundPageHandler(res, client);
    return {
      props: {
        error: true,
      },
    };
  }
}

export default Page;
