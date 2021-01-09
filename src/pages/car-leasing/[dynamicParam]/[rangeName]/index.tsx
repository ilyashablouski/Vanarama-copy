import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../../apolloClient';
import {
  GET_VEHICLE_LIST,
  GET_BODY_STYLES,
} from '../../../../containers/SearchPageContainer/gql';
import { GET_PRODUCT_CARDS_DATA } from '../../../../containers/CustomerAlsoViewedContainer/gql';
import { GENERIC_SEARCH_PAGE_SLUG } from '../../../../gql/genericPage';
import SearchPageContainer from '../../../../containers/SearchPageContainer';
import {
  getCapsIds,
  ssrCMSQueryExecutor,
} from '../../../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';
import { bodyStyleList_bodyStyleList as IModelsData } from '../../../../../generated/bodyStyleList';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../../../generated/globalTypes';
import { GetProductCard } from '../../../../../generated/GetProductCard';
import { vehicleList } from '../../../../../generated/vehicleList';
import { formatUrl, notFoundPageHandler } from '../../../../utils/url';
import { ISearchPageProps } from '../../../../models/ISearchPageProps';
import PageNotFoundContainer from '../../../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { GET_SEARCH_POD_DATA } from '../../../../containers/SearchPodContainer/gql';
import { filterList_filterList as IFilterList } from '../../../../../generated/filterList';
import FeaturedAndTilesContainer from '../../../../containers/FeaturedAndTilesContainer/FeaturedAndTilesContainer';
import { PAGE_TYPES } from '../../../../utils/pageTypes';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  vehiclesList?: vehicleList;
  productCardsData?: GetProductCard;
  responseCapIds?: string[];
  filtersData?: IFilterList | undefined;
  bodyStyleList?: IModelsData[];
  makeParam: string;
  rangeParam?: string;
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData,
  metaData,
  vehiclesList,
  bodyStyleList,
  productCardsData,
  responseCapIds,
  error,
  notFoundPageData,
  filtersData,
  rangeParam,
  makeParam,
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
      preloadMake={makeParam}
      preloadRange={rangeParam}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  const makeName = (context?.query?.dynamicParam as string).toLowerCase();
  const rangeName = (context?.query?.rangeName as string).toLowerCase();
  let vehiclesList;
  let productCardsData;
  let responseCapIds;
  let bodyStyleList;
  try {
    const { data, errors } = (await ssrCMSQueryExecutor(
      client,
      context,
      true,
      'isRangePage',
    )) as ApolloQueryResult<any>;
    // should contain only 2 routs params(make, range)
    if (Object.keys(context.query).length === 2) {
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
            manufacturerSlug: makeName,
            rangeSlug: rangeName,
          },
        })
        .then(resp => resp.data);

      try {
        const resp = await client.query({
          query: GET_BODY_STYLES,
          variables: {
            vehicleTypes: VehicleTypeEnum.CAR,
            leaseType: LeaseTypeEnum.PERSONAL,
            manufacturerSlug: makeName,
            rangeSlug: rangeName,
          },
        });
        // assign re mapped list
        bodyStyleList = await Promise.all(
          resp.data.bodyStyleList.map(async (listItem: IModelsData) => {
            const { data: slug } = await client.query({
              query: GENERIC_SEARCH_PAGE_SLUG,
              variables: {
                slug: formatUrl(
                  `car-leasing/${makeName}/${rangeName}/${listItem.bodyStyle}`,
                ),
              },
            });
            return {
              ...listItem,
              legacyUrl: slug?.genericPage.metaData.legacyUrl,
            };
          }),
        );
        console.log(bodyStyleList, null, 2);
      } catch (err) {
        bodyStyleList = null;
      }

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
    const { data: filtersData } = await client.query({
      query: GET_SEARCH_POD_DATA,
      variables: {
        onOffer: null,
        vehicleTypes: [VehicleTypeEnum.CAR],
        manufacturerSlug: (context?.query
          ?.dynamicParam as string).toLowerCase(),
        rangeSlug: (context?.query?.rangeName as string).toLowerCase(),
      },
    });
    return {
      props: {
        pageData: data,
        metaData: data.genericPage.metaData,
        isServer: !!context.req,
        vehiclesList: vehiclesList || null,
        bodyStyleList: bodyStyleList || null,
        productCardsData: productCardsData || null,
        responseCapIds: responseCapIds || null,
        error: errors ? errors[0] : null,
        filtersData: filtersData?.filterList || null,
        makeParam: (context?.query?.dynamicParam as string).toLowerCase(),
        rangeParam: (context?.query?.rangeName as string).toLowerCase(),
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
