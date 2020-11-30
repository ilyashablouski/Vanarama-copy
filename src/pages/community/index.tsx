import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import DefaultErrorPage from 'next/error';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import BlogPostContainer from '../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import createApolloClient from '../../apolloClient';

const CommunityPage: NextPage<IGenericPage> = ({ data, error, loading }) => {
  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (loading) {
    return <Loading size="large" />;
  }

  const body = getSectionsData(['body'], data?.genericPage);
  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <BlogPostContainer
      body={body}
      name={name}
      image={image}
      cards={cards}
      breadcrumbsItems={breadcrumbsItems}
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'community',
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default CommunityPage;
