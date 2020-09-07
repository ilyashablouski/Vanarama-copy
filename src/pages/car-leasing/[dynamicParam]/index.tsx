import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  bodyUrls,
  prepareSlugPart,
  fuelMapper,
  getBodyStyleForCms,
} from '../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import withApollo from '../../../hocs/withApollo';

interface IPageType {
  isBodyStylePage: boolean;
  isFuelType: boolean;
  isMakePage: boolean;
}

interface IProps {
  isServer: boolean;
  pageType: IPageType;
  pathname?: string;
  asPath?: string;
  query: any;
}

const Page: NextPage<IProps> = ({
  isServer,
  query,
  pageType,
  pathname,
  asPath,
}) => {
  const router = useRouter();
  useEffect(() => {
    // copy dynamic param for actual filter query
    if (
      (pageType.isMakePage && !router.query.make) ||
      (pageType.isBodyStylePage && !router.query.bodyStyles) ||
      (pageType.isFuelType && !router.query.fuelTypes)
    ) {
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
    />
  );
};
Page.getInitialProps = ({ query, req, pathname, asPath }) => {
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
  return {
    query: { ...newQuery },
    isServer: !!req,
    pageType,
    pathname,
    asPath,
  };
};

export default withApollo(Page);
