import { NextPage } from 'next';
import DefaultErrorPage from 'next/error';
import { PreviewNextPageContext } from 'types/common';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import CategoryPageContainer from '../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import { decodeData, encodeData } from '../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';

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

export async function getStaticProps(context: PreviewNextPageContext) {
  try {
    const client = createApolloClient({}, context);
    const { data: genericPage, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'blog',
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });

    // Obfuscate data from Googlebot
    const data = encodeData(genericPage);

    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL) ||
        Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
        Number(DEFAULT_REVALIDATE_INTERVAL_ERROR),
      props: {
        error: true,
      },
    };
  }
}

export default withApollo(CategoryPage);
