import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { IPageWithError, PageTypeEnum } from 'types/common';
import SchemaJSON from 'core/atoms/schema-json';
import withApollo from '../../../../hocs/withApollo';
import { BLOG_POST_PAGE } from '../../../../gql/blogPost';
import BlogPostContainer from '../../../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { BLOG_POSTS_PAGE } from '../../../../gql/blogPosts';
import { getArticles } from '../../../../utils/articles';
import { IBlogPostProps } from '../../../../models/IBlogsProps';
import createApolloClient from '../../../../apolloClient';
import { getBlogPaths } from '../../../../utils/pageSlugs';
import {
  BlogPosts,
  BlogPostsVariables,
} from '../../../../../generated/BlogPosts';
import { decodeData, encodeData } from '../../../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../../utils/env';
import {
  convertSlugToBreadcrumbsSchema,
  getBlogBreadCrumbsItems,
} from '../../../../utils/breadcrumbs';
import {
  BlogPost as BlogPostData,
  BlogPostVariables,
} from '../../../../../generated/BlogPost';
import { convertErrorToProps } from '../../../../utils/helpers';

const BlogPost: NextPage<IBlogPostProps> = ({
  data,
  blogPosts: encodedData,
  articleUrl,
}) => {
  const blogPosts = decodeData(encodedData);

  const articles = getSectionsData(['blogPosts', 'articles'], blogPosts);
  const body = getSectionsData(['body'], data?.blogPost);
  const bodyLower = getSectionsData(['bodyLower'], data?.blogPost);
  const name = getSectionsData(['metaData', 'name'], data?.blogPost);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.blogPost,
  );
  const metaData = getSectionsData(['metaData'], data?.blogPost);
  const breadcrumbsItems = getBlogBreadCrumbsItems(metaData);
  const breadcrumbsSchema = convertSlugToBreadcrumbsSchema(metaData.slug);

  return (
    <>
      <BlogPostContainer
        articles={articles}
        body={body}
        bodyLower={bodyLower}
        name={name}
        image={image}
        breadcrumbsItems={breadcrumbsItems}
        metaData={metaData}
        articleUrl={articleUrl}
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
        slug: 'blog/community-news',
        isPreview: !!context?.preview,
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

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IBlogPostProps | IPageWithError>> {
  try {
    const articleUrl = `blog/community-news/${context?.params?.articles}`;
    const client = createApolloClient({});
    const { data } = await client.query<BlogPostData, BlogPostVariables>({
      query: BLOG_POST_PAGE,
      variables: {
        slug: articleUrl,
        isPreview: !!context?.preview,
      },
    });
    const { data: blogPosts } = await client.query<
      BlogPosts,
      BlogPostsVariables
    >({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/community-news',
        isPreview: !!context?.preview,
      },
    });
    const newBlogPosts = {
      blogPosts: { ...blogPosts.blogPosts },
    };
    newBlogPosts.blogPosts.articles = getArticles(
      getSectionsData(['blogPosts', 'articles'], blogPosts),
      `/${articleUrl}`,
    );

    // Obfuscate data from Googlebot
    const newBlogPostsData = encodeData(newBlogPosts);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        blogPosts: newBlogPostsData,
        articleUrl,
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

export default withApollo(BlogPost);
