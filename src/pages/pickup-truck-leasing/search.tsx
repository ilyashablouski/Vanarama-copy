import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../apolloClient';
import SearchPageContainer from '../../containers/SearchPageContainer';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { ISearchPageProps } from '../../models/ISearchPageProps';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
}

const Page: NextPage<IProps> = ({ isServer, pageData, metaData }) => {
  return (
    <SearchPageContainer
      isServer={isServer}
      isPickups
      metaData={metaData}
      pageData={pageData}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({});
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    false,
    '',
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
