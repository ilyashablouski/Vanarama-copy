import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import createApolloClient from '../../apolloClient';
import { SearchContainer } from '../../containers/SearchPageContainer';
import { ssrCMSQueryExecutor } from '../../containers/SearchPageContainer/helpers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { ISearchPageProps } from '../../models/ISearchPageProps';
import { decodeData, encodeData } from '../../utils/data';
import { getManufacturerJson } from '../../utils/url';

interface IProps extends ISearchPageProps {
  pageData: GenericPageQuery;
}

const Page: NextPage<IProps> = ({
  isServer,
  pageData: encodedData,
  metaData,
}) => {
  return (
    <SearchContainer
      dataUiTestId="pickups-search-page"
      isServer={isServer}
      isPickups
      metaData={metaData}
      pageData={decodeData(encodedData)}
    />
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  const client = createApolloClient({});

  try {
    const contextData = {
      req: {
        url: context.resolvedUrl || '',
      },
      query: { ...context.query },
    };
    const [{ data }, migrationSlugs] = await Promise.all([
      (await ssrCMSQueryExecutor(
        client,
        contextData,
        false,
        '',
      )) as ApolloQueryResult<GenericPageQuery>,
      getManufacturerJson(),
    ]);
    return {
      props: {
        pageData: encodeData(data),
        migrationSlugs: migrationSlugs || null,
        metaData: data?.genericPage.metaData || null,
        isServer: !!context.req,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default Page;
