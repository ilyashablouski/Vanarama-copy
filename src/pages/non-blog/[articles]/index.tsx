import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { useGenericPage } from '../../../gql/genericPage';
import Head from '../../../components/Head/Head';
import withApollo from '../../../hocs/withApollo';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const NonBlogPost: NextPage = () => {
  const router = useRouter();
  const slug = `/${router.query.articles as string}`;
  const { data, loading, error } = useGenericPage(slug);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const metaData = data?.genericPage?.metaData;

  return (
    <>
      <BlogPostContainer body={body} name={name} image={image} />
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage?.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(NonBlogPost);
