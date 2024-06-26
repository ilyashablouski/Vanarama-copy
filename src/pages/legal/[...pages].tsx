import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { ApolloError } from '@apollo/client';
import { IPageWithData, IPageWithError, PageTypeEnum } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
import { LEGAL_PAGE_QUERY } from '../../containers/LegalArticleContainer/gql';
import createApolloClient from '../../apolloClient';
import { PAGE_COLLECTION } from '../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../utils/pageSlugs';
import LegalArticleContainer from '../../containers/LegalArticleContainer/LegalArticleContainer';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../generated/PageCollection';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumbs from '../../core/atoms/breadcrumbs-v2';
import Head from '../../components/Head/Head';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import {
  LegalPageQuery,
  LegalPageQueryVariables,
} from '../../../generated/LegalPageQuery';
import { convertErrorToProps } from '../../utils/helpers';
import { getBreadCrumbsItems } from '../../utils/breadcrumbs';

type IProps = IPageWithData<{
  data: LegalPageQuery;
}>;

const BlogPost: NextPage<IProps> = ({ data }) => {
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);

  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      <LegalArticleContainer
        body={body}
        name={metaData.name}
        image={image}
        sections={sections}
      />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticPaths(context: GetStaticPropsContext) {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Legal',
      isPreview: !!context?.preview,
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'legal'),
    fallback: 'blocking',
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});
    const paths = context?.params?.pages as string[];

    const { data } = await client.query<
      LegalPageQuery,
      LegalPageQueryVariables
    >({
      query: LEGAL_PAGE_QUERY,
      variables: {
        slug: `legal/${paths?.join('/')}`,
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
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

export default BlogPost;
