import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { GET_PRODUCT_CARDS_DATA } from '../../../containers/CustomerAlsoViewedContainer/gql';
import {
  GET_RANGES,
  GET_VEHICLE_LIST,
} from '../../../containers/SearchPageContainer/gql';
import { GET_SEARCH_POD_DATA } from '../../../containers/SearchPodContainer/gql';
import createApolloClient from '../../../apolloClient';
import { PAGE_TYPES, SITE_SECTIONS } from '../../../utils/pageTypes';
import {
  bodyUrls,
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
import { rangeList } from '../../../../generated/rangeList';
import { notFoundPageHandler } from '../../../utils/url';
import { ISearchPageProps } from '../../../models/ISearchPageProps';
import PageNotFoundContainer from '../../../containers/PageNotFoundContainer/PageNotFoundContainer';

interface IPageType {
  isBodyStylePage: boolean;
  isTransmissionPage: boolean;
  isMakePage: boolean;
}

interface IProps extends ISearchPageProps {
  pageType?: IPageType;
  query: any;
  pageData: GenericPageQuery;
  filtersData?: IFilterList | undefined;
  ranges: rangeList;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
}

const Page: NextPage<IProps> = ({
  isServer,
  query,
  pageType = {},
  pageData,
  metaData,
  filtersData,
  vehiclesList,
  productCardsData,
  responseCapIds,
  ranges,
  error,
  notFoundPageData,
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
    // copy dynamic param for actual filter query
    if (
      (pageType.isMakePage && !router.query.make) ||
      (pageType.isBodyStylePage && !router.query.bodyStyles) ||
      (pageType.isTransmissionPage && !router.query.transmissions)
    ) {
      const { pathname, asPath } = router;
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
      isMakePage={pageType.isMakePage}
      isBodyStylePage={pageType.isBodyStylePage}
      isTransmissionPage={pageType.isTransmissionPage}
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
  const { query, req, res } = context;
  const newQuery = { ...query };
  const client = createApolloClient({}, context);
  let ranges;
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  const filter = {} as any;
  // check for bodystyle page
  const isBodyStylePage = !!bodyUrls.find(
    getBodyStyleForCms,
    (query.dynamicParam as string).toLowerCase(),
  );
  // check for transmissons page
  const isTransmissionPage = isTransmission(query.dynamicParam as string);
  const pageType = {
    isBodyStylePage,
    isTransmissionPage,
    isMakePage: !(isBodyStylePage || isTransmissionPage),
  };
  if (isBodyStylePage || isTransmissionPage) {
    if (isBodyStylePage) {
      newQuery.bodyStyles = (query.dynamicParam as string)
        .replace('-', ' ')
        .replace('-leasing', '');
      filter.bodyStyles = [newQuery.bodyStyles];
    } else if (isTransmissionPage) {
      newQuery.transmissions = (query.dynamicParam as string).replace('-', ' ');
      filter.transmissions = [newQuery.transmissions];
    }
    if (Object.keys(context.query).length === 1) {
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
    newQuery.make = (query.dynamicParam as string).toLowerCase();
    filter.manufacturerSlug = newQuery.make;
    ranges = await client
      .query({
        query: GET_RANGES,
        variables: {
          vehicleTypes: VehicleTypeEnum.LCV,
          manufacturerName: newQuery.make,
          leaseType: LeaseTypeEnum.BUSINESS,
        },
      })
      .then(resp => resp.data);
  }
  const { data: filtersData } = await client.query({
    query: GET_SEARCH_POD_DATA,
    variables: {
      onOffer: null,
      vehicleTypes: [VehicleTypeEnum.LCV],
      ...filter,
    },
  });
  const [type] =
    Object.entries(pageType).find(([, value]) => value === true) || '';
  try {
    const { data, errors } = (await ssrCMSQueryExecutor(
      client,
      context,
      false,
      type as string,
    )) as ApolloQueryResult<any>;
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
