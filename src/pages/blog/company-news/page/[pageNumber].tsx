import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import { PreviewNextPageContext } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
import React from 'react';
import { useRouter } from 'next/router';
import createApolloClient from '../../../../apolloClient';
import { BLOG_POSTS_PAGE } from '../../../../gql/blogPosts';
import CategoryPageContainer from '../../../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { IBlogCategory } from '../../../../models/IBlogsProps';
import { buildStaticPaths, getBlogPosts } from '../../../../utils/pagination';
import { getMetadataForPagination } from '../../../../utils/url';
import { decodeData } from '../../../../utils/data';
import {
  convertSlugToBreadcrumbsSchema,
  getBreadCrumbsItems,
} from '../../../../utils/breadcrumbs';

const CategoryPage: NextPage<IBlogCategory> = ({
  data: encodedData,
  error,
  pageNumber,
}) => {
  // De-obfuscate data for user
  const data = decodeData(encodedData);
  const router = useRouter();

  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const articles = getSectionsData(['articles'], data?.blogPosts);
  const pageTitle = getSectionsData(['pageTitle'], data?.blogPosts);
  const metaData = getMetadataForPagination(
    getSectionsData(['metaData'], data?.blogPosts),
    pageNumber,
    router.asPath,
  );
  const breadcrumbsItems = getBreadCrumbsItems(metaData);
  const breadcrumbsSchema = convertSlugToBreadcrumbsSchema(metaData.slug);

  return (
    <>
      <CategoryPageContainer
        breadcrumbsItems={breadcrumbsItems}
        metaData={metaData}
        articles={articles}
        pageTitle={pageTitle}
        activePageRoute={pageNumber || 1}
      />
      {metaData.slug && !metaData.schema && (
        <SchemaJSON json={JSON.stringify(breadcrumbsSchema)} />
      )}
    </>
  );
};

export async function getStaticPaths(context: PreviewNextPageContext) {
  try {
    const client = createApolloClient({});
    const { data } = await client.query({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/company-news',
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });
    const paths = buildStaticPaths(data);
    return {
      paths,
      fallback: 'blocking',
    };
  } catch {
    return {
      paths: [
        {
          params: { pageNumber: '/' },
        },
      ],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  return getBlogPosts(client, BLOG_POSTS_PAGE, 'blog/company-news', context);
}

export default CategoryPage;
