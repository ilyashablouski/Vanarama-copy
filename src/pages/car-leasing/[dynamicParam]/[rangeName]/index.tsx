import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import withApollo from '../../../../hocs/withApollo';
import SearchPageContainer from '../../../../containers/SearchPageContainer';

interface IProps {
  isServer: boolean;
  pathname?: string;
  asPath?: string;
}

const Page: NextPage<IProps> = ({ isServer, pathname, asPath }) => {
  const router = useRouter();
  useEffect(() => {
    if (!router.query.make) {
      const query = { ...router.query, make: router.query.dynamicParam };
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
  return <SearchPageContainer isServer={isServer} isCarSearch isRangePage />;
};
Page.getInitialProps = ({ query, req, pathname, asPath }) => {
  return { query, isServer: !!req, pathname, asPath };
};

export default withApollo(Page);
