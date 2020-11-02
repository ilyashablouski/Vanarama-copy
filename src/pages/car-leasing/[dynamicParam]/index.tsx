import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import {
  GET_RANGES,
  GET_VEHICLE_LIST,
} from '../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import createApolloClient from '../../../apolloClient';
import { PAGE_TYPES, SITE_SECTIONS } from '../../../utils/pageTypes';
import {
  bodyUrls,
  fuelMapper,
  getBodyStyleForCms,
  getCapsIds,
  ssrCMSQueryExecutor,
} from '../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import { rangeList } from '../../../../generated/rangeList';
import { pushPageData } from '../../../utils/dataLayerHelpers';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../../generated/GenericPageQuery';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { filterList_filterList as IFilterList } from '../../../../generated/filterList';
import { vehicleList } from '../../../../generated/vehicleList';
import { GetProductCard } from '../../../../generated/GetProductCard';

interface IPageType {
  isBodyStylePage: boolean;
  isFuelType: boolean;
  isMakePage: boolean;
}

interface IProps {
  isServer: boolean;
  pageType: IPageType;
  query: any;
  pageData: GenericPageQuery;
  metaData: PageMetaData;
  filtersData?: IFilterList | undefined;
  ranges: rangeList;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
}

const Page: NextPage<IProps> = ({
  isServer,
  query,
  pageType,
  pageData,
  metaData,
  filtersData,
  vehiclesList,
  productCardsData,
  responseCapIds,
  ranges,
}) => {
  const router = useRouter();
  useEffect(() => {
    pushPageData({
      pageType: pageType.isMakePage
        ? PAGE_TYPES.makePage
        : PAGE_TYPES.vehicleTypePage,
      siteSection: SITE_SECTIONS.cars,
      pathname: router.pathname,
    });
    // copy dynamic param for actual filter query
    if (
      (pageType.isMakePage && !router.query.make) ||
      (pageType.isBodyStylePage && !router.query.bodyStyles) ||
      (pageType.isFuelType && !router.query.fuelTypes)
    ) {
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
      isMakePage={pageType.isMakePage}
      isBodyStylePage={pageType.isBodyStylePage}
      isFuelPage={pageType.isFuelType}
      pageData={pageData}
      metaData={metaData}
      preLoadFiltersData={filtersData}
      preLoadRanges={ranges}
      preLoadVehiclesList={vehiclesList}
      preLoadProductCardsData={productCardsData}
      preLoadResponseCapIds={responseCapIds}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const { query, req } = context;
  const newQuery = { ...query };
  const client = createApolloClient({}, context);
  let ranges;
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  // check for bodystyle page
  const isBodyStylePage = !!bodyUrls.find(
    getBodyStyleForCms,
    (query.dynamicParam as string).toLowerCase(),
  );
  // check for fuel page
  const isFuelType = !!fuelMapper[
    query.dynamicParam as keyof typeof fuelMapper
  ];
  const pageType = {
    isBodyStylePage,
    isFuelType,
    isMakePage: !(isBodyStylePage || isFuelType),
  };
  if (isBodyStylePage || isFuelType) {
    const filter = {} as any;
    if (isBodyStylePage) {
      newQuery.bodyStyles = (query.dynamicParam as string).replace('-', ' ');
      filter.bodyStyles = [newQuery.bodyStyles];
    } else if (isFuelType) {
      newQuery.fuelTypes =
        fuelMapper[query.dynamicParam as keyof typeof fuelMapper];
      filter.fuelTypes = [newQuery.fuelTypes];
    }
    if (Object.keys(context.query).length === 1) {
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
                vehicleType: VehicleTypeEnum.CAR,
              },
            })
            .then(resp => resp.data);
        }
      } catch {
        return false;
      }
    }
  } else {
    newQuery.make = query.dynamicParam;
    ranges = await client
      .query({
        query: GET_RANGES,
        variables: {
          vehicleTypes: VehicleTypeEnum.CAR,
          manufacturerName: newQuery.make,
          leaseType: LeaseTypeEnum.PERSONAL,
        },
      })
      .then(resp => resp.data);
  }
  const [type] =
    Object.entries(pageType).find(([, value]) => value === true) || '';
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    true,
    type as string,
  )) as ApolloQueryResult<any>;
  const { data: filtersData } = await client.query({
    query: GET_SEARCH_POD_DATA,
    variables: {
      onOffer: null,
      vehicleTypes: [VehicleTypeEnum.CAR],
    },
  });
  return {
    props: {
      query: { ...newQuery },
      isServer: !!req,
      pageType,
      pageData: data,
      metaData: data.genericPage.metaData,
      filtersData: filtersData?.filterList,
      vehiclesList: vehiclesList || null,
      productCardsData: productCardsData || null,
      responseCapIds: responseCapIds || null,
      ranges: ranges || null,
    },
  };
}

export default Page;
