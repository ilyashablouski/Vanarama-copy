/* eslint-disable @typescript-eslint/camelcase */
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import withApollo from '../../../../hocs/withApollo';
import { BLOG_POST_PAGE } from '../../../../gql/blogPost';
import BlogPostContainer from '../../../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { BLOG_POSTS_PAGE } from '../../../../gql/blogPosts';
import { getArticles } from '../../../../utils/articles';
import createApolloClient from '../../../../apolloClient';
import { IBlogPost } from '../../../../models/IBlogsProps';
import { BlogPosts } from '../../../../../generated/BlogPosts';
import { getBlogPaths } from '../../../../utils/pageSlugs';

const BlogPost: NextPage<IBlogPost> = ({ data, blogPosts }) => {
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
      articles={articles}
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
      slug: 'blog/cars',
    },
  });

  return {
    paths: getBlogPaths(data?.blogPosts),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: BLOG_POST_PAGE,
      variables: {
        slug: `blog/cars/${context?.params?.articles}`,
      },
    });
    const {
      data: blogPosts,
      loading: blogPostsLoading,
      errors: blogPostsError,
    } = await client.query({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/cars',
      },
    });

    const newBlogPosts = {
      blogPosts: { ...blogPosts.blogPosts },
    };
    newBlogPosts.blogPosts.articles = getArticles(
      getSectionsData(['blogPosts', 'articles'], blogPosts),
      `/blog/cars/${context?.params?.articles}`,
    );
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      props: {
        data,
        blogPosts: newBlogPosts,
        blogPostsLoading,
        blogPostsError: blogPostsError ? blogPostsError[0] : null,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default withApollo(BlogPost);
