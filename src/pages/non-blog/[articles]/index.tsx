import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { useGenericPage } from '../../../gql/genericPage';
import Head from '../../../components/Head/Head';
import withApollo from '../../../hocs/withApollo';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';

const NonBlogPost: NextPage = () => {
  const router = useRouter();
  const slug = `/${router.query.articles as string}`;
  const { data, loading, error } = useGenericPage(slug);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const metaData = data?.genericPage?.metaData;

  const crumbs = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Non-blog',
      href: '/non-blog',
    },
    {
      label: name || '',
      href: `/${router.query.article}`,
    },
  ];

  return (
    <>
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage?.featuredImage}
        />
      )}
      <BlogPostContainer
        body={body}
        name={name}
        image={image}
        crumbs={crumbs}
      />
    </>
  );
};

export default withApollo(NonBlogPost);
