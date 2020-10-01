import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { useBlogPostsPage } from '../../../gql/blogPosts';
import Head from '../../../components/Head/Head';
import withApollo from '../../../hocs/withApollo';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import CategoryPageContainer from '../../../containers/CategoryPageContainer/CategoryPageContainer';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useBlogPostsPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const metaData = data?.blogPosts?.metaData;
  const articles = data?.blogPosts?.articles;
  const pageTitle = data?.blogPosts?.pageTitle;

  return (
    <>
      <CategoryPageContainer
        metaData={metaData}
        articles={articles}
        pageTitle={pageTitle}
      />
      {metaData && <Head metaData={metaData} />}
    </>
  );
};

export default withApollo(CategoryPage);
