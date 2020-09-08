import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Head from '../../components/Head/Head';
import withApollo from '../../hocs/withApollo';
import { useGenericPage } from '../../gql/genericPage';
import BlogPostContainer from '../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../utils/getSectionsData';

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
    label: 'Post',
    href: '/blog/post',
  },
];

const BlogPost: NextPage = () => {
  const { data, loading, error } = useGenericPage(
    '/car-leasing-explained/business-vs-personal-car-leasing',
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage.featuredImage}
        />
      )}
      <BlogPostContainer
        body={body}
        name={name}
        image={image}
        cards={cards}
        crumbs={crumbs}
      />
    </>
  );
};

export default withApollo(BlogPost);
