import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import React from 'react';
import { PreviewNextPageContext } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
import withApollo from '../../../../hocs/withApollo';
import { BLOG_POST_PAGE } from '../../../../gql/blogPost';
import BlogPostContainer from '../../../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { BLOG_POSTS_PAGE } from '../../../../gql/blogPosts';
import { getArticles } from '../../../../utils/articles';
import createApolloClient from '../../../../apolloClient';
import { IBlogPost } from '../../../../models/IBlogsProps';
import {
  BlogPosts,
  BlogPostsVariables,
} from '../../../../../generated/BlogPosts';
import { getBlogPaths } from '../../../../utils/pageSlugs';
import { decodeData, encodeData } from '../../../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../../utils/env';
import {
  convertSlugToBreadcrumbsSchema,
  getBreadCrumbsItems,
} from '../../../../utils/breadcrumbs';
import { BlogPost as BlogPostData } from '../../../../../generated/BlogPost';

const BlogPost: NextPage<IBlogPost> = ({
  data,
  error,
  blogPosts: encodedData,
  blogPostsError,
}) => {
  if (error || blogPostsError || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }
  // De-obfuscate data for user
  const blogPosts = decodeData(encodedData);

  const articles = getSectionsData(['blogPosts', 'articles'], blogPosts);
  const body = getSectionsData(['body'], data?.blogPost);
  const name = getSectionsData(['metaData', 'name'], data?.blogPost);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.blogPost,
  );
  const metaData = getSectionsData(['metaData'], data?.blogPost);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);
  const breadcrumbsSchema = convertSlugToBreadcrumbsSchema(metaData.slug);

  return (
    <>
      <BlogPostContainer
        articles={articles}
        body={body}
        name={name}
        image={image}
        breadcrumbsItems={breadcrumbsItems}
        metaData={metaData}
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
    const { data } = await client.query<BlogPosts, BlogPostsVariables>({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/cars',
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });

    return {
      paths: getBlogPaths(data?.blogPosts),
      fallback: 'blocking',
    };
  } catch {
    return {
      paths: [
        {
          params: { articles: ['/'] },
        },
      ],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query<BlogPostData>({
      query: BLOG_POST_PAGE,
      variables: {
        slug: `blog/cars/${context?.params?.articles}`,
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });
    const {
      data: blogPosts,
      loading: blogPostsLoading,
      errors: blogPostsError,
    } = await client.query<BlogPosts, BlogPostsVariables>({
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

    // Obfuscate data from Googlebot
    const newBlogPostsData = encodeData(newBlogPosts);

    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL) ||
          Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data,
        error: errors ? errors[0] : null,
        blogPosts: newBlogPostsData,
        blogPostsLoading,
        blogPostsError: blogPostsError ? blogPostsError[0] : null,
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
      notFound: true,
    };
  }
}

export default withApollo(BlogPost);
