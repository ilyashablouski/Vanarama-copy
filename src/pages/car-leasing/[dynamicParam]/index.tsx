import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';
import {
  GET_LEGACY_URLS,
  GET_RANGES,
  GET_VEHICLE_LIST,
} from '../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import createApolloClient from '../../../apolloClient';
import { PAGE_TYPES, SITE_SECTIONS } from '../../../utils/pageTypes';
import {
  bodyUrlsSlugMapper,
  budgetMapper,
  dynamicQueryTypeCheck,
  fuelMapper,
  getCapsIds,
  RESULTS_PER_REQUEST,
  sortObjectGenerator,
  ssrCMSQueryExecutor,
} from '../../../containers/SearchPageContainer/helpers';
import { DynamicParamSearchContainer } from '../../../containers/SearchPageContainer';
import { rangeList, rangeListVariables } from '../../../../generated/rangeList';
import { pushPageData } from '../../../utils/dataLayerHelpers';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  SortObject,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import {
  filterList,
  filterListVariables,
  filterList_filterList as IFilterList,
} from '../../../../generated/filterList';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../../generated/vehicleList';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../../generated/GetProductCard';
import { generateRangeSlugs, getManufacturerJson } from '../../../utils/url';
import { ISearchPageProps } from '../../../models/ISearchPageProps';
import {
  genericPagesQuery,
  genericPagesQueryVariables,
  genericPagesQuery_genericPages as IGenericPage,
} from '../../../../generated/genericPagesQuery';
import FeaturedAndTilesContainer from '../../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import { decodeData, encodeData } from '../../../utils/data';
import { Nullable } from '../../../types/common';
import { SearchPageTypes } from '../../../containers/SearchPageContainer/interfaces';
import { isManufacturerPageFeatureFlagEnabled } from '../../../utils/helpers';
import isObjectsShallowEqual from '../../../utils/objects';
import { OnOffer } from '../../../../entities/global';

interface IPageType {
  isBodyStylePage: boolean;
  isFuelType: boolean;
  isManufacturerPage: boolean;
  isBudgetType: boolean;
}

interface IProps extends ISearchPageProps {
  pageType?: IPageType;
  pageData: GenericPageQuery;
  filtersData?: Nullable<IFilterList>;
  ranges: Nullable<rangeList>;
  rangesUrls: IGenericPage['items'];
  vehiclesList?: Nullable<vehicleList>;
  productCardsData?: GetProductCard;
  responseCapIds?: Nullable<string[]>;
  topOffersList?: Nullable<vehicleList>;
  topOffersCardsData?: Nullable<GetProductCard>;
  defaultSort?: Nullable<SortObject[]>;
  isManufacturerFeatureFlagEnabled?: boolean;
  querySSR: ParsedUrlQuery;
}

const Page: NextPage<IProps> = ({
  isServer,
  pageType: ssrPageType,
  pageData,
  metaData,
  filtersData,
  vehiclesList: encodedData,
  productCardsData: productEncodedData,
  topOffersList: topOffersListEncodedData,
  topOffersCardsData: topOffersCardsEncodedData,
  responseCapIds,
  ranges,
  rangesUrls,
  defaultSort,
  isManufacturerFeatureFlagEnabled,
  querySSR,
}) => {
  const router = useRouter();
  const initialFilterFuelType =
    filtersData?.fuelTypes && filtersData?.fuelTypes[0];
  // De-obfuscate data for user
  const vehiclesList = decodeData(encodedData);
  const productCardsData = decodeData(productEncodedData);
  const topOffersList = decodeData(topOffersListEncodedData);
  const topOffersCardsData = decodeData(topOffersCardsEncodedData);

  /** using for dynamically change type when we navigate between different page type (exp. make -> budget) */
  const queryPageType = useRef<IPageType>();
  const pageType = useMemo(() => {
    if (
      queryPageType?.current?.isManufacturerPage ??
      ssrPageType?.isManufacturerPage
    ) {
      return SearchPageTypes.MANUFACTURER_PAGE;
    }
    if (
      queryPageType?.current?.isBodyStylePage ??
      ssrPageType?.isBodyStylePage
    ) {
      return SearchPageTypes.BODY_STYLE_PAGE;
    }
    if (queryPageType?.current?.isFuelType ?? ssrPageType?.isFuelType) {
      return SearchPageTypes.FUEL_TYPE_PAGE;
    }
    if (queryPageType?.current?.isBudgetType ?? ssrPageType?.isBudgetType) {
      return SearchPageTypes.BUDGET_PAGE;
    }
    return SearchPageTypes.SIMPLE_SEARCH_PAGE;
  }, [
    ssrPageType?.isBodyStylePage,
    ssrPageType?.isBudgetType,
    ssrPageType?.isFuelType,
    ssrPageType?.isManufacturerPage,
  ]);

  useLayoutEffect(() => {
    queryPageType.current = dynamicQueryTypeCheck(
      router.query.dynamicParam as string,
    );
    pushPageData({
      pageType: queryPageType?.current?.isManufacturerPage
        ? PAGE_TYPES.manufacturerPage
        : PAGE_TYPES.vehicleTypePage,
      siteSection: SITE_SECTIONS.cars,
      router,
      initialFilterFuelType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.dynamicParam, router.query.fuelTypes]);

  useEffect(() => {
    if (!isObjectsShallowEqual(router.query, querySSR)) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...querySSR,
          },
        },
        router.asPath,
        { shallow: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (metaData.pageType === PAGE_TYPES.nonBlogPage) {
    return <FeaturedAndTilesContainer data={pageData} />;
  }

  return (
    <DynamicParamSearchContainer
      dataUiTestId="cars-search-page"
      isServer={isServer}
      isCarSearch
      pageType={pageType}
      pageData={pageData}
      metaData={metaData}
      preLoadFiltersData={filtersData}
      preLoadRanges={ranges}
      rangesUrls={rangesUrls}
      preLoadVehiclesList={vehiclesList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
      preLoadTopOffersList={topOffersList}
      preLoadTopOffersCardsData={topOffersCardsData}
      defaultSort={defaultSort}
      isManufacturerFeatureFlagEnabled={isManufacturerFeatureFlagEnabled}
    />
  );
};
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const { query, req, resolvedUrl } = context;
  const client = createApolloClient({}, context);
  let ranges;
  let rangesUrls;
  let vehiclesList;
  let topOffersCardsData;
  let productCardsData;
  let responseCapIds;
  let defaultSort;
  const filter = {} as any;
  const pageType = dynamicQueryTypeCheck(query.dynamicParam as string);
  const { isBodyStylePage, isFuelType, isBudgetType } = pageType;
  if (isBodyStylePage || isFuelType || isBudgetType) {
    if (isBodyStylePage) {
      query.bodyStyles =
        bodyUrlsSlugMapper[
          query.dynamicParam as keyof typeof bodyUrlsSlugMapper
        ];
      filter.bodyStyles = [query.bodyStyles];
    } else if (isFuelType) {
      query.fuelTypes =
        fuelMapper[query.dynamicParam as keyof typeof fuelMapper];
      filter.fuelTypes = query.fuelTypes.split(',');
    } else if (isBudgetType) {
      const rate = budgetMapper[
        query.dynamicParam as keyof typeof budgetMapper
      ].split('|');
      filter.rate = {
        min: parseInt(rate[0], 10) || undefined,
        max: parseInt(rate[1], 10) || undefined,
      };
      query.pricePerMonth =
        budgetMapper[query.dynamicParam as keyof typeof budgetMapper];
    }
    // length should be 2, because we added manually query param for dynamic param
    // it's use for correct filters preselect
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
    if (Object.keys(context.query).length === 2) {
      vehiclesList = await client
        .query({
          query: GET_VEHICLE_LIST,
          variables: {
            vehicleTypes: [VehicleTypeEnum.CAR],
            leaseType: LeaseTypeEnum.PERSONAL,
            onOffer: OnOffer.FILTER_DISABLED,
            first: RESULTS_PER_REQUEST,
            sort: defaultSort,
            ...filter,
          },
        })
        .then(resp => resp.data);

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
    }
  } else {
    query.make = (query.dynamicParam as string).toLowerCase();
    filter.manufacturerSlug = query.make;
    ranges = await client
      .query<rangeList, rangeListVariables>({
        query: GET_RANGES,
        variables: {
          vehicleTypes: VehicleTypeEnum.CAR,
          manufacturerSlug: query.make,
          leaseType: LeaseTypeEnum.PERSONAL,
        },
      })
      .then(resp => resp.data);
    const slugs = generateRangeSlugs(ranges, query.make);

    rangesUrls =
      slugs &&
      (await client
        .query<genericPagesQuery, genericPagesQueryVariables>({
          query: GET_LEGACY_URLS,
          variables: {
            slugs,
          },
        })
        .then(resp => resp?.data?.genericPages?.items));
  }
  const { data: filtersData } = await client.query<
    filterList,
    filterListVariables
  >({
    query: GET_SEARCH_POD_DATA,
    variables: {
      onOffer: OnOffer.FILTER_DISABLED,
      vehicleTypes: [VehicleTypeEnum.CAR],
      ...filter,
    },
  });
  const [type] = Object.entries(pageType).find(([, value]) => value) || '';
  const topOffersList = await client
    .query<vehicleList, vehicleListVariables>({
      query: GET_VEHICLE_LIST,
      variables: {
        vehicleTypes: [VehicleTypeEnum.CAR],
        leaseType: LeaseTypeEnum.PERSONAL,
        onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
        first: pageType.isManufacturerPage ? 6 : 9,
        sort: [{ field: SortField.offerRanking, direction: SortDirection.ASC }],
        ...filter,
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
          vehicleType: VehicleTypeEnum.CAR,
        },
      })
      .then(resp => resp.data);
  }

  try {
    const contextData = {
      req: {
        url: context.resolvedUrl || '',
      },
      query: { ...context.query },
    };
    const isManufacturerFeatureFlagEnabled = isManufacturerPageFeatureFlagEnabled(
      req.headers.cookie,
      resolvedUrl,
    );
    const [{ data }, migrationSlugs] = await Promise.all([
      (await ssrCMSQueryExecutor(
        client,
        contextData,
        true,
        type as string,
        isManufacturerFeatureFlagEnabled,
      )) as ApolloQueryResult<GenericPageQuery>,
      getManufacturerJson(),
    ]);
    return {
      props: {
        isServer: !!req,
        pageType,
        pageData: data,
        migrationSlugs: migrationSlugs || null,
        metaData: data?.genericPage.metaData || null,
        filtersData: filtersData?.filterList,
        responseCapIds: responseCapIds || null,
        vehiclesList: vehiclesList ? encodeData(vehiclesList) : null,
        productCardsData: productCardsData
          ? encodeData(productCardsData)
          : null,
        topOffersList: topOffersList ? encodeData(topOffersList) : null,
        topOffersCardsData: topOffersCardsData
          ? encodeData(topOffersCardsData)
          : null,
        ranges: ranges || null,
        defaultSort: defaultSort || null,
        rangesUrls: rangesUrls || null,
        isManufacturerFeatureFlagEnabled,
        querySSR: context.query,
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
