import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  bodyUrls,
  isTransmission,
  getBodyStyleForCms,
} from '../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import withApollo from '../../../hocs/withApollo';

interface IPageType {
  isBodyStylePage: boolean;
  isTransmissionPage: boolean;
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
      (pageType.isTransmissionPage && !router.query.transmissions)
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
      isCarSearch={false}
      isMakePage={pageType.isMakePage}
      isBodyStylePage={pageType.isBodyStylePage}
      isTransmissionPage={pageType.isTransmissionPage}
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
  return {
    query: { ...newQuery },
    isServer: !!req,
    pageType,
    pathname,
    asPath,
  };
};

export default withApollo(Page);
