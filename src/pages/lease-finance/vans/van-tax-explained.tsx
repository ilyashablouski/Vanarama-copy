import { NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import DefaultErrorPage from 'next/error';
import withApollo from '../../../hocs/withApollo';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../../utils/getSectionsData';
import createApolloClient from '../../../apolloClient';
import { GENERIC_PAGE, IGenericPage } from '../../../gql/genericPage';

const BlogPost: NextPage<IGenericPage> = ({ data, error }) => {
  if (error) {
    return <DefaultErrorPage statusCode={404} />;
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

export async function getStaticProps(context: NextPageContext) {
  try {
    const client = createApolloClient({}, context);
    const { data, loading, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `lease-finance/vans/van-tax-explained`,
      },
    });
    return { props: { data, loading, error: errors ? errors[0] : null } };
  } catch {
    return { props: { error: true } };
  }
}

export default withApollo(BlogPost);
