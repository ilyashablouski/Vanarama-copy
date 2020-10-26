import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../apolloClient';
import { PAGE_TYPES, SITE_SECTIONS } from '../../../utils/pageTypes';
import {
  bodyUrls,
  fuelMapper,
  getBodyStyleForCms,
  ssrCMSQueryExecutor,
} from '../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import withApollo from '../../../hocs/withApollo';
import { pushPageData } from '../../../utils/dataLayerHelpers';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../../generated/GenericPageQuery';
import {GET_SEARCH_POD_DATA} from '../../../containers/SearchPodContainer/gql';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

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
}

const Page: NextPage<IProps> = ({
  isServer,
  query,
  pageType,
  pageData,
  metaData,
  filtersData,
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
      preloadFiltersData={filtersData}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const { query, req } = context;
  const newQuery = { ...query };

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
  if (isBodyStylePage)
    newQuery.bodyStyles = (query.dynamicParam as string).replace('-', ' ');
  else if (isFuelType)
    newQuery.fuelTypes =
      fuelMapper[query.dynamicParam as keyof typeof fuelMapper];
  else newQuery.make = query.dynamicParam;
  const [type] =
    Object.entries(pageType).find(([, value]) => value === true) || '';
  const client = createApolloClient({}, context);
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    true,
    type as string,
  )) as ApolloQueryResult<any>;
  const {data: filtersData} = await client.query({
    query: GET_SEARCH_POD_DATA,
    variables: {
      onOffer: null,
      vehicleTypes: [VehicleTypeEnum.CAR]
    }
  })
  return {
    props: {
      query: { ...newQuery },
      isServer: !!req,
      pageType,
      pageData: data,
      metaData: data.genericPage.metaData,
      filtersData
    },
  };
}

export default withApollo(Page);
