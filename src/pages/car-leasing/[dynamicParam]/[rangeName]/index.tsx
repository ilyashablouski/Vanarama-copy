import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import withApollo from '../../../../hocs/withApollo';
import SearchPageContainer from '../../../../containers/SearchPageContainer';

interface IProps {
  isServer: boolean;
}

const Page: NextPage<IProps> = ({ isServer }) => {
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
  return <SearchPageContainer isServer={isServer} isCarSearch isRangePage />;
};

export async function getServerSideProps({ query, req }: NextPageContext) {
  return { props: { query, isServer: !!req } };
}

export default withApollo(Page);
