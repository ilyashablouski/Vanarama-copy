import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { IPageWithData, IPageWithError } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
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
  getBlogBreadCrumbsItems,
} from '../../../../utils/breadcrumbs';
import {
  BlogPosts,
  BlogPostsVariables,
} from '../../../../../generated/BlogPosts';

type IProps = IPageWithData<IBlogCategory>;

const CategoryPage: NextPage<IProps> = ({ data: encodedData, pageNumber }) => {
  const data = decodeData(encodedData);

  const articles = getSectionsData(['articles'], data?.blogPosts);
  const pageTitle = getSectionsData(['pageTitle'], data?.blogPosts);
  const metaData = getMetadataForPagination(
    getSectionsData(['metaData'], data?.blogPosts),
    pageNumber ?? 1,
  );
  const breadcrumbsItems = getBlogBreadCrumbsItems(metaData);
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

export async function getStaticPaths(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({});
    const { data } = await client.query<BlogPosts, BlogPostsVariables>({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/cars',
        isPreview: !!context?.preview,
      },
    });
    const paths = buildStaticPaths(data);
    return {
      paths,
      fallback: false,
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

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  const client = createApolloClient({});
  return getBlogPosts(client, BLOG_POSTS_PAGE, 'blog/cars', context);
}

export default CategoryPage;
