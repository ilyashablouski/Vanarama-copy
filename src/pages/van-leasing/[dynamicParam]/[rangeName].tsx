import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from 'apolloClient';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import { ssrCMSQueryExecutor } from '../../../containers/SearchPageContainer/helpers';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../../generated/GenericPageQuery';

interface IProps {
  isServer: boolean;
  pageData: GenericPageQuery;
  metaData: PageMetaData;
}

const Page: NextPage<IProps> = ({ isServer, pageData, metaData }) => {
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
  return (
    <SearchPageContainer isServer={isServer} isCarSearch={false} isRangePage metaData={metaData}
    pageData={pageData}/>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    false,
    'isRangePage',
  )) as ApolloQueryResult<any>;
  return {
    props: {
      pageData: data,
      metaData: data.genericPage.metaData,
      isServer: !!context.req,
    },
  };
}

export default Page;
