import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import withApollo from '../../../../hocs/withApollo';
import { BLOG_POST_PAGE } from '../../../../gql/blogPost';
import BlogPostContainer from '../../../../containers/BlogPostContainer/BlogPostContainer';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { BLOG_POSTS_PAGE } from '../../../../gql/blogPosts';
import { getArticles } from '../../../../utils/articles';
import createApolloClient from '../../../../apolloClient';
import {
  IBlogPost,
  IBlogPostWithCarousel,
} from '../../../../models/IBlogsProps';
import {
  BlogPosts,
  BlogPostsVariables,
} from '../../../../../generated/BlogPosts';
import { decodeData, encodeData } from '../../../../utils/data';
import {
  convertSlugToBreadcrumbsSchema,
  getBreadCrumbsItems,
} from '../../../../utils/breadcrumbs';
import {
  BlogPost as BlogPostData,
  BlogPostVariables,
} from '../../../../../generated/BlogPost';
import { getBlogPaths } from '../../../../utils/pageSlugs';
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../../../types/common';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../../utils/env';
import { convertErrorToProps } from '../../../../utils/helpers';

type IProps = IPageWithData<IBlogPost>;

const BlogPost: NextPage<IBlogPostWithCarousel> = ({
  data,
  blogPosts: encodedData,
}) => {
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
        isShowCarousel
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
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});
    const { data } = await client.query<BlogPostData, BlogPostVariables>({
      query: BLOG_POST_PAGE,
      variables: {
        slug: `blog/cars/${context?.params?.articles}`,
        isPreview: !!context?.preview,
      },
    });

    const { data: blogPosts } = await client.query<
      BlogPosts,
      BlogPostsVariables
    >({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/cars',
        isPreview: !!context?.preview,
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
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        blogPosts: newBlogPostsData,
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
