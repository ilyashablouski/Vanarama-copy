import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { useBlogPostPage } from '../../../gql/blogPost';
import Head from '../../../components/Head/Head';
import withApollo from '../../../hocs/withApollo';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import CategoryPageContainer from '../../../containers/CategoryPageContainer/CategoryPageContainer';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useBlogPostCategory(
    router.asPath.slice(1),
    true,
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const metaData = data?.blogPost?.metaData;
  const articles = data?.blogPost?.articles;
  const pageTitle = data?.blogPost?.pageTitle;

  return (
    <>
      <CategoryPageContainer
        articles={articles}
        metaData={metaData}
        pageTitle={pageTitle}
        featuredImage={data?.blogPost?.featuredImage}
      />
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.blogPost?.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(CategoryPage);
