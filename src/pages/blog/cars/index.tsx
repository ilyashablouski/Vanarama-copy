import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import createApolloClient from '../../../apolloClient';
import { BLOG_POSTS_PAGE } from '../../../gql/blogPosts';
import withApollo from '../../../hocs/withApollo';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import CategoryPageContainer from '../../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../../utils/getSectionsData';
import { IBlogCategory } from '../../../models/IBlogsProps';

const CategoryPage: NextPage<IBlogCategory> = ({ data, loading, error }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error?.message} />;
  }

  const articles = getSectionsData(['articles'], data?.blogPosts);
  const pageTitle = getSectionsData(['pageTitle'], data?.blogPosts);
  const metaData = getSectionsData(['metaData'], data?.blogPosts);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <CategoryPageContainer
      breadcrumbsItems={breadcrumbsItems}
      metaData={metaData}
      articles={articles}
      pageTitle={pageTitle}
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const { data, loading, errors } = await client.query({
    query: BLOG_POSTS_PAGE,
    variables: {
      slug: 'blog/cars',
    },
  });
  return { props: { data, loading, error: errors ? errors[0].message : null } };
}

export default withApollo(CategoryPage);
