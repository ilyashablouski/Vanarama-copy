import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { Nullable } from 'types/common';
import createApolloClient from '../../../../apolloClient';
import {
  GET_VEHICLE_LIST,
  GET_BODY_STYLES,
} from '../../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../../containers/CustomerAlsoViewedContainer/gql';
import { getGenericSearchPageSlug } from '../../../../gql/genericPage';
import { RangeSearchContainer } from '../../../../containers/SearchPageContainer';
import {
  getCapsIds,
  RESULTS_PER_REQUEST,
  sortObjectGenerator,
  ssrCMSQueryExecutor,
  NEW_RANGE_SLUGS,
  countOfUniqueQueries,
  trimSlug,
} from '../../../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';
import {
  bodyStyleList as bodyStyleListData,
  bodyStyleListVariables,
  bodyStyleList_bodyStyleList as IModelsData,
} from '../../../../../generated/bodyStyleList';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  SortObject,
  VehicleTypeEnum,
} from '../../../../../generated/globalTypes';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../../../generated/GetProductCard';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../../../generated/vehicleList';
import {
  formatUrl,
  getManufacturerJson,
  isManufacturerMigrated,
  removeUrlQueryPart,
} from '../../../../utils/url';
import { ISearchPageProps } from '../../../../models/ISearchPageProps';
import { GET_SEARCH_POD_DATA } from '../../../../containers/SearchPodContainer/gql';
import {
  filterList,
  filterListVariables,
  filterList_filterList as IFilterList,
} from '../../../../../generated/filterList';
import FeaturedAndTilesContainer from '../../../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import { PAGE_TYPES, SITE_SECTIONS } from '../../../../utils/pageTypes';
import { decodeData, encodeData } from '../../../../utils/data';
import { pushPageData } from '../../../../utils/dataLayerHelpers';
import { SearchPageTypes } from '../../../../containers/SearchPageContainer/interfaces';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: Nullable<vehicleList>;
  productCardsData?: Nullable<GetProductCard>;
  responseCapIds?: Nullable<string[]>;
  filtersData?: Nullable<IFilterList>;
  bodyStyleList?: Nullable<IModelsData[]>;
  manufacturerParam: string;
  rangeParam?: string;
  topOffersList?: Nullable<vehicleList>;
  topOffersCardsData?: Nullable<GetProductCard>;
  defaultSort?: SortObject[];
  newRangePageSlug?: string;
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  bodyStyleList: bodyStyleEncodedData,
  vehiclesList: encodedData,
  productCardsData: productEncodedData,
  topOffersList: topOffersListEncodedData,
  topOffersCardsData: topOffersCardsEncodedData,
  responseCapIds,
  filtersData,
  rangeParam,
  manufacturerParam,
  defaultSort,
  newRangePageSlug,
}) => {
  const router = useRouter();
  const initialFilterFuelType =
    filtersData?.fuelTypes && filtersData?.fuelTypes[0];
  // De-obfuscate data for user
  const vehiclesList = decodeData(encodedData);
  const productCardsData = decodeData(productEncodedData);
  const bodyStyleList = decodeData(bodyStyleEncodedData);
  const topOffersList = decodeData(topOffersListEncodedData);
  const topOffersCardsData = decodeData(topOffersCardsEncodedData);

  useEffect(() => {
    pushPageData({
      pageType: PAGE_TYPES.rangePage,
      siteSection: SITE_SECTIONS.cars,
      router,
      initialFilterFuelType,
    });
  }, [router.query.fuelTypes]);

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

  if (metaData.pageType === PAGE_TYPES.nonBlogPage) {
    return <FeaturedAndTilesContainer data={pageData} />;
  }

  return (
    <RangeSearchContainer
      dataUiTestId="cars-search-page"
      isServer={isServer}
      isCarSearch
      pageType={SearchPageTypes.RANGE_PAGE}
      metaData={metaData}
      pageData={pageData}
      preLoadVehiclesList={vehiclesList}
      preloadBodyStyleList={bodyStyleList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
      preLoadFiltersData={filtersData}
      preloadManufacturer={manufacturerParam}
      preloadRange={rangeParam}
      preLoadTopOffersList={topOffersList}
      preLoadTopOffersCardsData={topOffersCardsData}
      defaultSort={defaultSort}
      newRangePageSlug={newRangePageSlug}
    />
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({});
  const manufacturerName = (context?.query
    ?.dynamicParam as string).toLowerCase();
  const rangeName = (context?.query?.rangeName as string).toLowerCase();
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  let bodyStyleList;
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
        true,
        NEW_RANGE_SLUGS.includes(
          removeUrlQueryPart(trimSlug(contextData.req?.url || '')),
        )
          ? 'isNewRangePage'
          : 'isRangePage',
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
            vehicleTypes: [VehicleTypeEnum.CAR],
            leaseType: LeaseTypeEnum.PERSONAL,
            onOffer: null,
            first: RESULTS_PER_REQUEST,
            sort: defaultSort,
            manufacturerSlug: manufacturerName,
            rangeSlug: rangeName,
          },
        })
        .then(resp => resp.data);

      try {
        const resp = await client.query<
          bodyStyleListData,
          bodyStyleListVariables
        >({
          query: GET_BODY_STYLES,
          variables: {
            vehicleTypes: VehicleTypeEnum.CAR,
            leaseType: LeaseTypeEnum.PERSONAL,
            manufacturerSlug: manufacturerName,
            rangeSlug: rangeName,
          },
        });
        // assign re mapped list
        if (resp.data.bodyStyleList) {
          bodyStyleList = await Promise.all(
            resp.data.bodyStyleList.map(async (listItem: IModelsData) => {
              const formattedUrl = formatUrl(
                `car-leasing/${manufacturerName}/${rangeName}/${
                  listItem.bodyStyle === '4X4/SUV'
                    ? '4x4-suv'
                    : listItem.bodyStyle
                }`,
              );
              const { data: slug } = await getGenericSearchPageSlug(
                formattedUrl,
              );
              return {
                ...listItem,
                url: isManufacturerMigrated(
                  migrationSlugs?.vehicles?.car?.manufacturers || [],
                  manufacturerName,
                )
                  ? `/${formattedUrl}`
                  : null,
                legacyUrl: slug?.genericPage.metaData.legacyUrl,
              };
            }),
          );
        }
      } catch (err) {
        bodyStyleList = null;
      }

      responseCapIds = getCapsIds(vehiclesList.vehicleList?.edges || []);

      if (responseCapIds.length) {
        productCardsData = await client
          .query<GetProductCard, GetProductCardVariables>({
            query: GET_PRODUCT_CARDS_DATA,
            variables: {
              capIds: responseCapIds,
              vehicleType: VehicleTypeEnum.CAR,
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
        vehicleTypes: [VehicleTypeEnum.CAR],
        manufacturerSlug: (context?.query
          ?.dynamicParam as string).toLowerCase(),
        rangeSlug: (context?.query?.rangeName as string).toLowerCase(),
      },
    });
    const topOffersList = await client
      .query<vehicleList, vehicleListVariables>({
        query: GET_VEHICLE_LIST,
        variables: {
          vehicleTypes: [VehicleTypeEnum.CAR],
          leaseType: LeaseTypeEnum.PERSONAL,
          onOffer: true,
          first: 9,
          sort: [
            { field: SortField.offerRanking, direction: SortDirection.ASC },
          ],
          manufacturerSlug: manufacturerName,
          rangeSlug: rangeName,
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
    context.query.make = manufacturerName;
    return {
      props: {
        pageData: data,
        metaData: data?.genericPage.metaData || null,
        migrationSlugs: migrationSlugs || null,
        isServer: !!context.req,
        vehiclesList: vehiclesList ? encodeData(vehiclesList) : null,
        bodyStyleList: bodyStyleList ? encodeData(bodyStyleList) : null,
        productCardsData: productCardsData
          ? encodeData(productCardsData)
          : null,
        topOffersList: topOffersList ? encodeData(topOffersList) : null,
        topOffersCardsData: topOffersCardsData
          ? encodeData(topOffersCardsData)
          : null,
        responseCapIds: responseCapIds || null,
        filtersData: filtersData?.filterList || null,
        manufacturerParam: (context?.query
          ?.dynamicParam as string).toLowerCase(),
        rangeParam: (context?.query?.rangeName as string).toLowerCase(),
        defaultSort: defaultSort || null,
        newRangePageSlug: removeUrlQueryPart(
          trimSlug(contextData.req?.url || ''),
        ),
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
