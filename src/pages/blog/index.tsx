import { NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import CategoryPageContainer from '../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import { decodeData, encodeData } from '../../utils/data';

const CategoryPage: NextPage<IGenericPage> = ({ data: encodedData, error }) => {
  // De-obfuscate data for user
  const data = decodeData(encodedData);

  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const tiles = getSectionsData(['sections', 'tiles'], data?.genericPage);
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);
  const carousel = getSectionsData(['sections', 'carousel'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <CategoryPageContainer
      breadcrumbsItems={breadcrumbsItems}
      featured={featured}
      carousel={carousel}
      metaData={metaData}
      tiles={tiles}
      featuredImage={data?.genericPage.featuredImage}
    />
  );
};

export async function getStaticProps(context: NextPageContext) {
  try {
    const client = createApolloClient({}, context);
    const { data: genericPage, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'blog',
      },
    });

    // Obfuscate data from Googlebot
    const data = encodeData(genericPage);

    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      fallback: true,
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      revalidate: 1,
      props: {
        error: true,
      },
    };
  }
}

export default withApollo(CategoryPage);
