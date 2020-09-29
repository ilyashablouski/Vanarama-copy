import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import Head from '../../../components/Head/Head';
import { useGenericPage } from '../../../gql/genericPage';
import withApollo from '../../../hocs/withApollo';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import CategoryPageContainer from '../../../containers/CategoryPageContainer/CategoryPageContainer';
import { useBlogPostPage } from '../../../gql/blogPost';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useBlogPostPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const carousel = data?.blogPost?.sections?.carousel;
  const metaData = data?.blogPost?.metaData;

  return (
    <>
      <CategoryPageContainer
        carousel={carousel}
        metaData={metaData}
        featuredImage={data?.blogPost.featuredImage}
      />
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.blogPost.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(CategoryPage);
