import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import {
  GET_RANGES,
  GET_LEGACY_URLS,
  GET_VEHICLE_LIST,
} from '../../../containers/SearchPageContainer/gql';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import createApolloClient from '../../../apolloClient';
import { PAGE_TYPES, SITE_SECTIONS } from '../../../utils/pageTypes';
import {
  bodyUrls,
  bodyUrlsSlugMapper,
  budgetMapper,
  getBodyStyleForCms,
  getCapsIds,
  isTransmission,
  ssrCMSQueryExecutor,
} from '../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import { pushPageData } from '../../../utils/dataLayerHelpers';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { filterList_filterList as IFilterList } from '../../../../generated/filterList';
import { vehicleList } from '../../../../generated/vehicleList';
import { GetProductCard } from '../../../../generated/GetProductCard';
import {
  rangeList,
  rangeList_rangeList as IRange,
} from '../../../../generated/rangeList';
import { notFoundPageHandler } from '../../../utils/url';
import { ISearchPageProps } from '../../../models/ISearchPageProps';
import PageNotFoundContainer from '../../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { genericPagesQuery_genericPages_items as IRangeUrls } from '../../../../generated/genericPagesQuery';

interface IPageType {
  isBodyStylePage: boolean;
  isTransmissionPage: boolean;
  isMakePage: boolean;
  isBudgetType: boolean;
}

interface IProps extends ISearchPageProps {
  pageType?: IPageType;
  pageData: GenericPageQuery;
  filtersData?: IFilterList | undefined;
  ranges: rangeList;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
  rangesUrls: IRangeUrls[];
  topOffersList?: vehicleList;
  topOffersCardsData?: GetProductCard;
}

const Page: NextPage<IProps> = ({
  isServer,
  pageType = {},
  pageData,
  metaData,
  filtersData,
  vehiclesList,
  productCardsData,
  responseCapIds,
  ranges,
  rangesUrls,
  error,
  notFoundPageData,
  topOffersList,
  topOffersCardsData,
}) => {
  const router = useRouter();
  useEffect(() => {
    pushPageData({
      pageType: pageType.isMakePage
        ? PAGE_TYPES.makePage
        : PAGE_TYPES.vehicleTypePage,
      siteSection: SITE_SECTIONS.vans,
      pathname: router.pathname,
    });
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
      isMakePage={pageType.isMakePage}
      isBodyStylePage={pageType.isBodyStylePage}
      isTransmissionPage={pageType.isTransmissionPage}
      pageData={pageData}
      isBudgetPage={pageType.isBudgetType}
      metaData={metaData}
      preLoadFiltersData={filtersData}
      preLoadRanges={ranges}
      rangesUrls={rangesUrls}
      preLoadVehiclesList={vehiclesList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
      preLoadTopOffersList={topOffersList}
      preLoadTopOffersCardsData={topOffersCardsData}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { query, req, res } = context;
  const client = createApolloClient({}, context);
  let ranges;
  let rangesUrls;
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  let topOffersCardsData;
  const filter = {} as any;
  // check for bodystyle page
  const isBodyStylePage = !!bodyUrls.find(
    getBodyStyleForCms,
    (query.dynamicParam as string).toLowerCase(),
  );
  // check for transmissons page
  const isTransmissionPage = isTransmission(query.dynamicParam as string);
  // check for budget page
  const isBudgetType = !!budgetMapper[
    query.dynamicParam as keyof typeof budgetMapper
  ];
  const pageType = {
    isBodyStylePage,
    isTransmissionPage,
    isBudgetType,
    isMakePage: !(isBodyStylePage || isTransmissionPage || isBudgetType),
  };
  if (isBodyStylePage || isTransmissionPage || isBudgetType) {
    if (isBodyStylePage) {
      query.bodyStyles =
        bodyUrlsSlugMapper[
          query.dynamicParam as keyof typeof bodyUrlsSlugMapper
        ];
      filter.bodyStyles = [query.bodyStyles];
    } else if (isTransmissionPage) {
      query.transmissions = (query.dynamicParam as string).replace('-', ' ');
      filter.transmissions = [query.transmissions];
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
    if (Object.keys(context.query).length === 2) {
      vehiclesList = await client
        .query({
          query: GET_VEHICLE_LIST,
          variables: {
            vehicleTypes: [VehicleTypeEnum.LCV],
            leaseType: LeaseTypeEnum.BUSINESS,
            onOffer: null,
            first: 9,
            sortField: SortField.availability,
            sortDirection: SortDirection.ASC,
            ...filter,
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
  } else {
    query.make = (query.dynamicParam as string).toLowerCase();
    filter.manufacturerSlug = query.make;
    ranges = await client
      .query({
        query: GET_RANGES,
        variables: {
          vehicleTypes: VehicleTypeEnum.LCV,
          manufacturerSlug: query.make,
          leaseType: LeaseTypeEnum.BUSINESS,
        },
      })
      .then(resp => resp.data);
    const slugs = ranges.rangeList.map(
      (range: IRange) =>
        `van-leasing/${(query.make as string)
          .toLowerCase()
          .split(' ')
          .join('-')}/${range.rangeName
          ?.toLowerCase()
          .split(' ')
          .join('-')}`,
    );
    rangesUrls = await client
      .query({
        query: GET_LEGACY_URLS,
        variables: {
          slugs,
        },
      })
      .then(resp => resp.data.genericPages.items);
  }
  const { data: filtersData } = await client.query({
    query: GET_SEARCH_POD_DATA,
    variables: {
      onOffer: null,
      vehicleTypes: [VehicleTypeEnum.LCV],
      ...filter,
    },
  });
  const [type] = Object.entries(pageType).find(([, value]) => value) || '';
  const topOffersList = await client
    .query({
      query: GET_VEHICLE_LIST,
      variables: {
        vehicleTypes: [VehicleTypeEnum.LCV],
        leaseType: LeaseTypeEnum.BUSINESS,
        onOffer: true,
        first: pageType.isMakePage ? 6 : 3,
        sortField: SortField.offerRanking,
        sortDirection: SortDirection.ASC,
        ...filter,
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

  try {
    const { data, errors } = (await ssrCMSQueryExecutor(
      client,
      context,
      false,
      type as string,
    )) as ApolloQueryResult<any>;
    return {
      props: {
        isServer: !!req,
        pageType,
        pageData: data,
        metaData: data.genericPage.metaData,
        filtersData: filtersData?.filterList,
        vehiclesList: vehiclesList || null,
        productCardsData: productCardsData || null,
        responseCapIds: responseCapIds || null,
        topOffersList: topOffersList || null,
        topOffersCardsData: topOffersCardsData || null,
        ranges: ranges || null,
        rangesUrls: rangesUrls || null,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    if (res) return notFoundPageHandler(res, client);
    return {
      props: {
        error: true,
        pageType,
      },
    };
  }
}

export default Page;
