import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import Head from '../../components/Head/Head';
import withApollo from '../../hocs/withApollo';
import { useBlogPostPage } from '../../gql/blogPost';
import NonBlogPostContainer from '../../containers/NonBlogPostContainer/NonBlogPostContainer';
import { useGenericPage } from 'gql/genericPage';

const NonBlogPost: NextPage = () => {
  const router = useRouter();
  const slug = `/${router.query.article as string}`;
  const { data, loading, error } = useGenericPage(slug);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const crumbs = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'non-blog',
      href: '/non-blog',
    },
   
  ];

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const metaData = data?.genericPage?.metaData;

  return (
    <>
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage?.featuredImage}
        />
      )}
      <NonBlogPostContainer
        body={body}
        name={name}
        image={image}
        crumbs={crumbs}
      />
    </>
  );
};

export default withApollo(NonBlogPost);
