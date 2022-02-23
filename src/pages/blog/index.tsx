import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { ApolloError } from '@apollo/client';
import { PageTypeEnum } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../apolloClient';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import CategoryPageContainer from '../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import { decodeData, encodeData } from '../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import {
  convertSlugToBreadcrumbsSchema,
  getBreadCrumbsItems,
} from '../../utils/breadcrumbs';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import { convertErrorToProps } from '../../utils/helpers';
import { getServiceBannerData } from '../../utils/serviceBannerHelper';

const CategoryPage: NextPage<IGenericPage> = ({
  data: encodedData,
  serviceBanner,
}) => {
  const data = decodeData(encodedData);

  const tiles = getSectionsData(['sections', 'tiles'], data?.genericPage);
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);
  const carousel = getSectionsData(['sections', 'carousel'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);
  const breadcrumbsSchema = convertSlugToBreadcrumbsSchema(metaData.slug);

  return (
    <>
      <CategoryPageContainer
        breadcrumbsItems={breadcrumbsItems}
        featured={featured}
        carousel={carousel}
        metaData={metaData}
        tiles={tiles}
        featuredImage={data?.genericPage.featuredImage}
        serviceBanner={serviceBanner}
      />
      {metaData.slug && !metaData.schema && (
        <SchemaJSON json={JSON.stringify(breadcrumbsSchema)} />
      )}
    </>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IGenericPageProps>> {
  try {
    const client = createApolloClient({});
    const { data: genericPage } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'blog',
        isPreview: !!context?.preview,
      },
    });

    // Obfuscate data from Googlebot
    const data = encodeData(genericPage);

    const { serviceBanner } = await getServiceBannerData(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default withApollo(CategoryPage);
