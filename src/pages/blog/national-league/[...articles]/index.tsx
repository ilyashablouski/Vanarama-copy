import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import withApollo from '../../../../hocs/withApollo';
import { BLOG_POST_PAGE } from '../../../../gql/blogPost';
import BlogPostContainer from '../../../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { BLOG_POSTS_PAGE } from '../../../../gql/blogPosts';
import { getArticles } from '../../../../utils/articles';
import { IBlogPost } from '../../../../models/IBlogsProps';
import createApolloClient from '../../../../apolloClient';
import { getBlogPaths } from '../../../../utils/pageSlugs';
import { BlogPosts } from '../../../../../generated/BlogPosts';

const BlogPost: NextPage<IBlogPost> = ({
  data,
  error,
  blogPosts,
  blogPostsError,
}) => {
  const router = useRouter();

  if (error || blogPostsError || !data) {
    return <DefaultErrorPage statusCode={404} />;
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
      slug: 'blog/national-league',
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
        slug: `blog/national-league/${context?.params?.articles}`,
      },
    });
    const { data: blogPosts, errors: blogPostsError } = await client.query({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/national-league',
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
        blogPosts,
        blogPostsError: blogPostsError ? blogPostsError[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default withApollo(BlogPost);
