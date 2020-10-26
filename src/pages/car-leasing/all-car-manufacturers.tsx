import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../apolloClient';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../containers/SearchPageContainer';
import withApollo from '../../hocs/withApollo';
import { GenericPageQuery_genericPage_metaData as PageMetaData } from '../../../generated/GenericPageQuery';
import { manufacturerPage_manufacturerPage_sections as sections } from '../../../generated/manufacturerPage';

interface IProps {
  isServer: boolean;
  metaData: PageMetaData;
  topInfoSection?: sections | null;
}

const Page: NextPage<IProps> = ({ isServer, topInfoSection, metaData }) => {
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch
      isAllMakesPage
      metaData={metaData}
      topInfoSection={topInfoSection}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const { data } = (await ssrCMSQueryExecutor(
    client,
    context,
    true,
    'isAllMakesPage',
  )) as ApolloQueryResult<any>;
  return {
    props: {
      topInfoSection: data.manufacturerPage.sections,
      metaData: data.manufacturerPage.metaData,
      isServer: !!context.req,
    },
  };
}

export default withApollo(Page);
