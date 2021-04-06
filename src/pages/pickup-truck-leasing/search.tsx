import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../apolloClient';
import SearchPageContainer from '../../containers/SearchPageContainer';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import { decodeData, encodeData } from '../../utils/data';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData: encodedData,
  metaData,
}) => {
  const pageData = decodeData(encodedData);
  return (
    <SearchPageContainer
      isServer={isServer}
      isPickups
      isSimpleSearchPage
      metaData={metaData}
      pageData={pageData}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  const contextData = {
    req: {
      url: context.req?.url || '',
    },
    query: { ...context.query },
  };
  const { data } = (await ssrCMSQueryExecutor(
    client,
    contextData,
    false,
    '',
  )) as ApolloQueryResult<GenericPageQuery>;
  return {
    props: {
      pageData: encodeData(data),
      metaData: data?.genericPage.metaData || null,
      isServer: !!context.req,
    },
  };
}

export default Page;
