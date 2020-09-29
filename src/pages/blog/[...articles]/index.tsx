import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import Head from '../../../components/Head/Head';
import withApollo from '../../../hocs/withApollo';
import { useBlogPostPage } from '../../../gql/blogPost';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useBlogPostPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const body = data?.blogPost?.body;
  const name = data?.blogPost?.metaData?.name;
  const image = data?.blogPost?.featuredImage?.file?.url;
  const metaData = data?.blogPost?.metaData;
  const articles = data?.blogPost?.category;

  return (
    <>
      <BlogPostContainer
        body={body}
        name={name}
        image={image}
        articles={articles}
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

export default withApollo(BlogPost);
