import { NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { getArticles, getArticlesSlug } from '../../../utils/articles';
import withApollo from '../../../hocs/withApollo';
import { BLOG_POPST_PAGE, useBlogPostPage } from '../../../gql/blogPost';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../utils/getSectionsData';
import { BLOG_POSTS_PAGE, useBlogPostsPage } from '../../../gql/blogPosts';
import createApolloClient from '../../../apolloClient';

const BlogPost: NextPage = ({
  data,
  loading,
  error,
  blogPosts,
  blogPostsLoading,
  blogPostsError,
}) => {
  const router = useRouter();
  // const { data, loading, error } = useBlogPostPage(router.asPath.slice(1));

  // const {
  //   data: blogPosts,
  //   loading: blogPostsLoading,
  //   error: blogPostsError,
  // } = useBlogPostsPage(getArticlesSlug(router));

  if (loading || blogPostsLoading) {
    return <Loading size="large" />;
  }

  if (error || blogPostsError) {
    return (
      <ErrorMessage message={error?.message || blogPostsError?.message || ''} />
    );
  }

  const articles = getSectionsData(['blogPosts', 'articles'], blogPosts);
  const body = getSectionsData(['body'], data?.blogPost);
  const name = getSectionsData(['metaData', 'name'], data?.blogPost);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.blogPost,
  );
  const metaData = getSectionsData(['metaData'], data?.blogPost);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <BlogPostContainer
      articles={getArticles(articles, router)}
      body={body}
      name={name}
      image={image}
      breadcrumbsItems={breadcrumbsItems}
      metaData={metaData}
    />
  );
};

export async function getStaticPaths(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const { data, loading, errors } = await client.query({
    query: BLOG_POPST_PAGE,
    variables: {
      slug: context.asPath?.slice(1),
    },
  });
  const {
    data: blogPosts,
    loading: blogPostsLoading,
    errors: blogPostsError,
  } = await client.query({
    query: BLOG_POSTS_PAGE,
    variables: {
      slug: 'blog',
    },
  });
  return {
    props: {
      data,
      loading,
      error: errors || null,
      blogPosts,
      blogPostsLoading,
      blogPostsError,
    },
  };
}

export default withApollo(BlogPost);
