import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import createApolloClient from '../../../../apolloClient';
import { BLOG_POSTS_PAGE } from '../../../../gql/blogPosts';
import CategoryPageContainer from '../../../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { IBlogCategory } from '../../../../models/IBlogsProps';
import { buildStaticPathes, getBlogPosts } from '../../../../utils/pagination';
import { getMetadataForPagination } from '../../../../utils/url';

const CategoryPage: NextPage<IBlogCategory> = ({ data, pageNumber }) => {
  const articles = getSectionsData(['articles'], data?.blogPosts);
  const pageTitle = getSectionsData(['pageTitle'], data?.blogPosts);
  const metaData = getMetadataForPagination(
    getSectionsData(['metaData'], data?.blogPosts),
    pageNumber,
  );
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <CategoryPageContainer
      breadcrumbsItems={breadcrumbsItems}
      metaData={metaData}
      articles={articles}
      pageTitle={pageTitle}
      activePageRoute={pageNumber || 1}
    />
  );
};

export async function getStaticPaths() {
  try {
    const client = createApolloClient({});
    const { data } = await client.query({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/national-league',
      },
    });
    const paths = buildStaticPathes(data);
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
      fallback: false,
    };
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  return getBlogPosts(client, BLOG_POSTS_PAGE, 'blog/national-league', context);
}

export default CategoryPage;
