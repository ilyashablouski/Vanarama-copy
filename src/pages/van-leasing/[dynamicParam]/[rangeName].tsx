import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../apolloClient';
import { GET_VEHICLE_LIST } from '../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import { RangeSearchContainer } from '../../../containers/SearchPageContainer';
import {
  countOfUniqueQueries,
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
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../../generated/GetProductCard';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../../generated/vehicleList';
import { ISearchPageProps } from '../../../models/ISearchPageProps';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import {
  filterList,
  filterListVariables,
  filterList_filterList as IFilterList,
} from '../../../../generated/filterList';
import { decodeData, encodeData } from '../../../utils/data';
import { Nullable } from '../../../types/common';
import { getManufacturerJson } from '../../../utils/url';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: Nullable<vehicleList>;
  productCardsData?: Nullable<GetProductCard>;
  responseCapIds?: Nullable<string[]>;
  filtersData?: Nullable<IFilterList>;
  topOffersList?: Nullable<vehicleList>;
  topOffersCardsData?: Nullable<GetProductCard>;
  defaultSort?: SortObject[];
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  responseCapIds,
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
      const query = {
        ...router.query,
        make: router.query.dynamicParam,
      };
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
    <RangeSearchContainer
      dataUiTestId="vans-search-page"
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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({});
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  let topOffersCardsData;
  let defaultSort;

  try {
    const contextData = {
      req: {
        url: context.resolvedUrl || '',
      },
      query: { ...context.query },
    };
    const [{ data }, migrationSlugs] = await Promise.all([
      (await ssrCMSQueryExecutor(
        client,
        contextData,
        false,
        'isRangePage',
      )) as ApolloQueryResult<GenericPageQuery>,
      getManufacturerJson(),
    ]);
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
    // should contain only 2 routs params(make, range). But can contain dynamicParam with the same value as make when ApolloClient resets.
    if (countOfUniqueQueries(context.query) === 2) {
      vehiclesList = await client
        .query<vehicleList, vehicleListVariables>({
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

      responseCapIds = getCapsIds(vehiclesList.vehicleList?.edges || []);
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
    }

    const { data: filtersData } = await client.query<
      filterList,
      filterListVariables
    >({
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
      .query<vehicleList, vehicleListVariables>({
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
        .query<GetProductCard, GetProductCardVariables>({
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
        migrationSlugs: migrationSlugs || null,
        metaData: data?.genericPage.metaData || null,
        isServer: !!context.req,
        responseCapIds: responseCapIds || null,
        filtersData: filtersData?.filterList || null,
        vehiclesList: vehiclesList ? encodeData(vehiclesList) : null,
        productCardsData: productCardsData
          ? encodeData(productCardsData)
          : null,
        topOffersList: topOffersList ? encodeData(topOffersList) : null,
        topOffersCardsData: topOffersCardsData
          ? encodeData(topOffersCardsData)
          : null,
        defaultSort: defaultSort || null,
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

export default Page;
