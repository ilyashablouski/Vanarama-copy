import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  bodyUrls,
  prepareSlugPart,
} from 'containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import withApollo from '../../../hocs/withApollo';

interface IProps {
  isServer: boolean;
  isMakePage: boolean;
  pathname?: string;
  asPath?: string;
  query: any;
}

const Page: NextPage<IProps> = ({
  isServer,
  query,
  isMakePage,
  pathname,
  asPath,
}) => {
  const router = useRouter();
  useEffect(() => {
    // copy dynamic param for actual filter query
    if (
      (isMakePage && !router.query.make) ||
      (!isMakePage && !router.query.bodyStyles)
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
  }, []);
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch
      isMakePage={isMakePage}
      isBodyStylePage={!isMakePage}
    />
  );
};
Page.getInitialProps = ({ query, req, pathname, asPath }) => {
  const newQuery = { ...query };
  // check for bodystyle page
  const isBodyStylePage =
    bodyUrls.indexOf(prepareSlugPart(query.dynamicParam)) > -1;
  if (isBodyStylePage) newQuery.bodyStyles = (query.dynamicParam as string).replace('-', ' ');
  else newQuery.make = query.dynamicParam;
  return {
    query: { ...newQuery },
    isServer: !!req,
    isMakePage: !isBodyStylePage,
    pathname,
    asPath,
  };
};

export default withApollo(Page);
