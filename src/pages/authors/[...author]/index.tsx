import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { PreviewNextPageContext } from 'types/common';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import SimplePageContainer from '../../../containers/SimplePageContainer/SimplePageContainer';
import createApolloClient from '../../../apolloClient';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';

const AuthorPage: NextPage<IGenericPage> = ({ data, loading }) => {
  return <SimplePageContainer data={data} loading={!!loading} />;
};

export async function getStaticPaths(context: PreviewNextPageContext) {
  const client = createApolloClient({});

  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Authors',
      ...(context?.preview && { isPreview: context?.preview }),
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'authors'),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.author as string[];

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `authors/${paths?.join('/')}`,
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default AuthorPage;
