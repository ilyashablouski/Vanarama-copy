import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../../apolloClient';
import { PAGE_TYPES, SITE_SECTIONS } from '../../../utils/pageTypes';
import {
  bodyUrls,
  getBodyStyleForCms,
  isTransmission,
  ssrCMSQueryExecutor,
} from '../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import { pushPageData } from '../../../utils/dataLayerHelpers';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../../generated/GenericPageQuery';

interface IPageType {
  isBodyStylePage: boolean;
  isTransmissionPage: boolean;
  isMakePage: boolean;
}

interface IProps {
  isServer: boolean;
  pageType: IPageType;
  query: any;
  pageData: GenericPageQuery;
  metaData: PageMetaData;
}

const Page: NextPage<IProps> = ({ isServer, query, pageType, pageData,
  metaData, }) => {
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
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch={false}
      isMakePage={pageType.isMakePage}
      isBodyStylePage={pageType.isBodyStylePage}
      isTransmissionPage={pageType.isTransmissionPage}
      pageData={pageData}
      metaData={metaData}
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
  // check for transmissons page
  const isTransmissionPage = isTransmission(query.dynamicParam as string);
  const pageType = {
    isBodyStylePage,
    isTransmissionPage,
    isMakePage: !(isBodyStylePage || isTransmissionPage),
  };
  if (isBodyStylePage)
    newQuery.bodyStyles = (query.dynamicParam as string)
      .replace('-', ' ')
      .replace('-leasing', '');
  else if (isTransmissionPage)
    newQuery.transmissions = (query.dynamicParam as string).replace('-', ' ');
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
  return { props: { query: { ...newQuery }, isServer: !!req, pageType,       pageData: data,
  metaData: data.genericPage.metaData, } };
}

export default Page;
