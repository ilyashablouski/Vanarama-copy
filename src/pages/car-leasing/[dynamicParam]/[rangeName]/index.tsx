import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { SlugNextPageContext } from 'types/common';
import createApolloClient from '../../../../apolloClient';
import {
  GET_VEHICLE_LIST,
  GET_BODY_STYLES,
} from '../../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../../containers/CustomerAlsoViewedContainer/gql';
import { getGenericSearchPageSlug } from '../../../../gql/genericPage';
import SearchPageContainer from '../../../../containers/SearchPageContainer';
import {
  getCapsIds,
  RESULTS_PER_REQUEST,
  sortObjectGenerator,
  ssrCMSQueryExecutor,
  NEW_RANGE_SLUGS,
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
import { formatUrl, notFoundPageHandler } from '../../../../utils/url';
import { ISearchPageProps } from '../../../../models/ISearchPageProps';
import PageNotFoundContainer from '../../../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { GET_SEARCH_POD_DATA } from '../../../../containers/SearchPodContainer/gql';
import {
  filterList,
  filterListVariables,
  filterList_filterList as IFilterList,
} from '../../../../../generated/filterList';
import FeaturedAndTilesContainer from '../../../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import { PAGE_TYPES } from '../../../../utils/pageTypes';
import { decodeData, encodeData } from '../../../../utils/data';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
  filtersData?: IFilterList | undefined;
  bodyStyleList?: IModelsData[];
  manufacturerParam: string;
  rangeParam?: string;
  topOffersList?: vehicleList;
  topOffersCardsData?: GetProductCard;
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
  error,
  notFoundPageData,
  filtersData,
  rangeParam,
  manufacturerParam,
  defaultSort,
  newRangePageSlug,
}) => {
  const router = useRouter();
  // De-obfuscate data for user
  const vehiclesList = decodeData(encodedData);
  const productCardsData = decodeData(productEncodedData);
  const bodyStyleList = decodeData(bodyStyleEncodedData);
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

  if (error) {
    return (
      <PageNotFoundContainer
        featured={notFoundPageData?.featured}
        cards={notFoundPageData?.cards}
        name={notFoundPageData?.name}
      />
    );
  }

  if (metaData.pageType === PAGE_TYPES.nonBlogPage) {
    return <FeaturedAndTilesContainer data={pageData} />;
  }

  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch
      isRangePage
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

export async function getServerSideProps(context: SlugNextPageContext) {
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
        url: context.req?.url || '',
        resolvedUrl: trimSlug(context.resolvedUrl || ''),
      },
      query: { ...context.query },
    };

    const { data, errors } = (await ssrCMSQueryExecutor(
      client,
      contextData,
      true,
      NEW_RANGE_SLUGS.includes(contextData.req?.resolvedUrl || '')
        ? 'isNewRangePage'
        : 'isRangePage',
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
              const { data: slug } = await getGenericSearchPageSlug(
                formatUrl(
                  `car-leasing/${manufacturerName}/${rangeName}/${listItem.bodyStyle}`,
                ),
              );
              return {
                ...listItem,
                legacyUrl: slug?.genericPage.metaData.legacyUrl,
              };
            }),
          );
        }
      } catch (err) {
        bodyStyleList = null;
      }

      try {
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
      } catch {
        return false;
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
        isServer: !!context.req,
        vehiclesList: encodeData(vehiclesList) || null,
        bodyStyleList: encodeData(bodyStyleList) || null,
        productCardsData: encodeData(productCardsData) || null,
        topOffersList: encodeData(topOffersList) || null,
        topOffersCardsData: encodeData(topOffersCardsData) || null,
        responseCapIds: responseCapIds || null,
        error: errors ? errors[0] : null,
        filtersData: filtersData?.filterList || null,
        manufacturerParam: (context?.query
          ?.dynamicParam as string).toLowerCase(),
        rangeParam: (context?.query?.rangeName as string).toLowerCase(),
        defaultSort: defaultSort || null,
        newRangePageSlug: contextData.req?.resolvedUrl || '',
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
