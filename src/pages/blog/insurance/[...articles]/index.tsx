import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../../../hocs/withApollo';
import { BLOG_POST_PAGE } from '../../../../gql/blogPost';
import BlogPostContainer from '../../../../containers/BlogPostContainer/BlogPostContainer';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { BLOG_POSTS_PAGE } from '../../../../gql/blogPosts';
import { getArticles } from '../../../../utils/articles';
import { IBlogPost } from '../../../../models/IBlogsProps';
import createApolloClient from '../../../../apolloClient';
import { getPaths } from '../../../../utils/pageSlugs';
import { BlogPosts } from '../../../../../generated/BlogPosts';

const BlogPost: NextPage<IBlogPost> = ({
  data,
  loading,
  error,
  blogPosts,
  blogPostsLoading,
  blogPostsError,
}) => {
  const router = useRouter();

  if (error || blogPostsError) {
    return (
      <ErrorMessage message={error?.message || blogPostsError?.message || ''} />
    );
  }

  if (loading || blogPostsLoading || !data) {
    return <Loading size="large" />;
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

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<BlogPosts>({
    query: BLOG_POSTS_PAGE,
    variables: {
      slug: 'blog/insurance',
    },
  });

  return {
    paths: getPaths(data?.blogPosts),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const { data, loading, errors } = await client.query({
    query: BLOG_POST_PAGE,
    variables: {
      slug: `blog/insurance/${context?.params?.articles}`,
    },
  });
  const {
    data: blogPosts,
    loading: blogPostsLoading,
    errors: blogPostsError,
  } = await client.query({
    query: BLOG_POSTS_PAGE,
    variables: {
      slug: 'blog/insurance',
    },
  });
  return {
    props: {
      data,
      loading,
      error: errors ? errors[0] : null,
      blogPosts,
      blogPostsLoading,
      blogPostsError: blogPostsError ? blogPostsError[0] : null,
    },
  };
}

export default withApollo(BlogPost);
