import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import CategoryPageContainer from '../../containers/CategoryPageContainer/CategoryPageContainer';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error?.message} />;
  }

  const carousel = data?.genericPage?.sections?.carousel;
  const featured = data?.genericPage?.sections?.featured;
  const metaData = data?.genericPage?.metaData;
  const tiles = data?.genericPage?.sections?.tiles;

  return (
    <>
      <CategoryPageContainer
        featured={featured}
        carousel={carousel}
        metaData={metaData}
        tiles={tiles}
        featuredImage={data?.genericPage.featuredImage}
      />
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(CategoryPage);
