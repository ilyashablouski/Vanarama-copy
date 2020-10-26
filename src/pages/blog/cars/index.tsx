import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { useBlogPostsPage } from '../../../gql/blogPosts';
import withApollo from '../../../hocs/withApollo';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import CategoryPageContainer from '../../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../../utils/getSectionsData';
import { GENERIC_PAGE, GENERIC_PAGE_HEAD } from '../../../gql/genericPage';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useBlogPostsPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
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

export async function getStaticProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const { data, loading, errors } = await client.query({
    query: GENERIC_PAGE,
    variables: {
      slug: 'blog',
    },
  });
  const { data: pageHead } = await client.query({
    query: GENERIC_PAGE_HEAD,
    variables: {
      slug: 'blog',
    },
  });
  return { props: { data, pageHead, loading, error: errors || null } };
}

export default withApollo(CategoryPage);
