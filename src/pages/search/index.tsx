import { NextPage, NextPageContext } from 'next';
import { ApolloQueryResult } from '@apollo/client';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import createApolloClient from '../../apolloClient';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

import { decodeData, encodeData } from '../../utils/data';
import { GET_TEXT_SEARCH_VEHICLES_DATA } from '../../containers/GlobalSearchContainer/gql';
import {
  fullTextSearchVehicleList,
  fullTextSearchVehicleListVariables,
} from '../../../generated/fullTextSearchVehicleList';
import GlobalSearchPageContainer from '../../containers/GlobalSearchPageContainer';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
  textSearchList?: fullTextSearchVehicleList;
}

const Page: NextPage<IProps> = ({ pageData, metaData, textSearchList }) => {
  return (
    <GlobalSearchPageContainer
      metaData={metaData}
      pageData={decodeData(pageData)}
      preLoadTextSearchList={decodeData(textSearchList)}
    />
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const contextData = {
    req: {
      url: context.req?.url || '',
    },
    query: { ...context.query },
  };
  const { data } = (await ssrCMSQueryExecutor(
    client,
    contextData,
    true,
    '',
  )) as ApolloQueryResult<GenericPageQuery>;
  const textSearchList = await client
    .query<fullTextSearchVehicleList, fullTextSearchVehicleListVariables>({
      query: GET_TEXT_SEARCH_VEHICLES_DATA,
      variables: {
        query: contextData.query.searchTerm as string,
        from: 0,
      },
    })
    .then(resp => resp.data);

  return {
    props: {
      pageData: encodeData(data),
      metaData: data?.genericPage.metaData || null,
      textSearchList: encodeData(textSearchList) || null,
    },
  };
}

export default Page;
