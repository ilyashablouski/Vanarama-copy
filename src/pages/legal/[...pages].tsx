import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import {
  ILegalPage,
  LEGAL_PAGE_QUERY,
} from '../../containers/LegalArticleContainer/gql';
import createApolloClient from '../../apolloClient';
import { PAGE_COLLECTION } from '../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../utils/pageSlugs';
import LegalArticleContainer from '../../containers/LegalArticleContainer/LegalArticleContainer';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../generated/PageCollection';

const BlogPost: NextPage<ILegalPage> = ({ data, error }) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const sections = data?.genericPage?.sections;

  return (
    <LegalArticleContainer
      body={body}
      name={name}
      image={image}
      sections={sections}
    />
  );
};

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Legal',
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'legal'),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.pages as string[];

    const { data, errors } = await client.query({
      query: LEGAL_PAGE_QUERY,
      variables: {
        slug: `legal/${paths?.join('/')}`,
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default BlogPost;
