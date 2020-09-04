import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import Head from '../../../components/Head/Head';
import withApollo from '../../../hocs/withApollo';
import { useBlogPostPage } from '../../../gql/blogPost';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const slug = router.asPath.replace('/blog/', '').replace('/', '');
  const { data, loading, error } = useBlogPostPage(slug);

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
      label: 'Blog',
      href: '/blog',
    },
    {
      label: data?.blogPost?.metaData?.name || '',
      href: '/blog/post',
    },
  ];

  const body = data?.blogPost?.body;
  const name = data?.blogPost?.metaData?.name;
  const image = data?.blogPost?.featuredImage?.file?.url;
  const metaData = data?.blogPost?.metaData;
  const articles = data?.blogPost?.category;

  return (
    <>
      <Head
        title={metaData?.title || ''}
        metaDescription={metaData?.metaDescription}
        metaRobots={metaData?.metaRobots}
        legacyUrl={metaData?.legacyUrl}
        publishedOn={metaData?.publishedOn}
        featuredImage={data?.blogPost?.featuredImage}
      />
      <BlogPostContainer
        body={body}
        name={name}
        image={image}
        articles={articles}
        crumbs={crumbs}
      />
    </>
  );
};

export default withApollo(BlogPost);
