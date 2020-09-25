import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import Head from '../../../components/Head/Head';
import { useGenericPage } from '../../../gql/genericPage';
import withApollo from '../../../hocs/withApollo';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import CategoryPageContainer from '../../../containers/CategoryPageContainer/CategoryPageContainer';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const featured = data?.genericPage?.sections?.featured;
  const carousel = data?.genericPage?.sections?.carousel;
  const tiles = data?.genericPage?.sections?.tiles;
  const metaData = data?.genericPage?.metaData;

  return (
    <>
      <CategoryPageContainer
        featured={featured}
        carousel={carousel}
        tiles={tiles}
        metaData={metaData}
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
