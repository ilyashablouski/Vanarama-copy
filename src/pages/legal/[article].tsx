import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import Head from '../../components/Head/Head';
import withApollo from '../../hocs/withApollo';
import { useLegalPageQuery } from '../../containers/LegalArticleContainer/gql';
import LegalArticleContainer from '../../containers/LegalArticleContainer/LegalArticleContainer';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const slug = router.asPath.replace('/blog/', '').replace('/', '');
  const { data, loading, error } = useLegalPageQuery(
    `/legal/${router.query.article as string}`,
  );

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
      label: 'legal',
      href: '/legal',
    },
    {
      label: data?.genericPage?.metaData?.name || '',
      href: `/legal/${router.query.article as string}`,
    },
  ];

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const metaData = data?.genericPage?.metaData;
  const sections = data?.genericPage?.sections;

  return (
    <>
      <Head
        title={metaData?.title || ''}
        metaDescription={metaData?.metaDescription}
        metaRobots={metaData?.metaRobots}
        legacyUrl={metaData?.legacyUrl}
        canonicalUrl={metaData?.canonicalUrl}
        publishedOn={metaData?.publishedOn}
        featuredImage={data?.genericPage?.featuredImage}
      />
      <LegalArticleContainer
        body={body}
        name={name}
        image={image}
        crumbs={crumbs}
        sections={sections}
      />
    </>
  );
};

export default withApollo(BlogPost);
