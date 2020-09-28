import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import Head from '../../components/Head/Head';
import withApollo from '../../hocs/withApollo';
import { useGenericPage } from '../../gql/genericPage';
import BlogPostContainer from '../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const cards = getSectionsData(
    ['cards', 'cards'],
    data?.genericPage?.sections,
  );
  const metaData = data?.genericPage?.metaData;

  return (
    <>
      <BlogPostContainer body={body} name={name} image={image} cards={cards} />
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(BlogPost);
