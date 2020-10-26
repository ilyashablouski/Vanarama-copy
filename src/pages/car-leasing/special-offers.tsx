import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../apolloClient';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../containers/SearchPageContainer';
import { GenericPageQuery_genericPage_metaData as PageMetaData } from '../../../generated/GenericPageQuery';

interface IProps {
  isServer: boolean;
  metaData: PageMetaData;
}

const Page: NextPage<IProps> = ({ isServer, metaData }) => {
  return (
    <SearchPageContainer
      isServer={isServer}
      isSpecialOfferPage
      isCarSearch
      metaData={metaData}
    />
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    true,
    'isSpecialOfferPage',
  )) as ApolloQueryResult<any>;
  return {
    props: {
      metaData: data.genericPage.metaData,
      isServer: !!context.req,
    },
  };
}

export default Page;
