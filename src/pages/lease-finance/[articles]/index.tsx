import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../hocs/withApollo';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../utils/getSectionsData';
import createApolloClient from '../../../apolloClient';

const BlogPost: NextPage<IGenericPage> = ({ data, loading, error }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const body = getSectionsData(['body'], data?.genericPage);
  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const cards = getSectionsData(
    ['cards', 'cards'],
    data?.genericPage?.sections,
  );

  return (
    <BlogPostContainer body={body} name={name} image={image} cards={cards} />
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { articles: 'van-gap-insurance' } },
      { params: { articles: 'glossary' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const { data, loading, errors } = await client.query({
    query: GENERIC_PAGE,
    variables: {
      slug: `lease-finance/${context?.params?.articles}`,
    },
  });
  return {
    props: {
      data,
      loading,
      error: errors ? errors[0] : null,
    },
  };
}

export default withApollo(BlogPost);
