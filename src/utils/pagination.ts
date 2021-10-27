import { ApolloClient, ApolloError, DocumentNode } from '@apollo/client';
import { GetStaticPropsContext } from 'next';
import {
  BlogPosts,
  BlogPostsVariables,
  BlogPosts_blogPosts_articles,
} from '../../generated/BlogPosts';
import { encodeData } from './data';
import { getSectionsData } from './getSectionsData';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from './env';
import { convertErrorToProps } from './helpers';

export const ARTICLES_PER_PAGE = 9;

export const getBlogPosts = async (
  client: ApolloClient<any>,
  query: DocumentNode,
  slug: string,
  context: GetStaticPropsContext,
) => {
  try {
    const { data: blogPosts } = await client.query<
      BlogPosts,
      BlogPostsVariables
    >({
      query,
      variables: {
        slug,
        isPreview: !!context?.preview,
      },
    });

    // Obfuscate data from Googlebot
    const data = encodeData(blogPosts);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        data,
        pageNumber:
          parseInt((context?.params?.pageNumber as string) || '', 10) || null,
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
        error: convertErrorToProps(error),
      },
    };
  }
};

export function sortingArticles(
  this: (BlogPosts_blogPosts_articles | null)[] | null,
) {
  return this?.reduce(
    (obj, el) => {
      if (el?.isFeatured) {
        obj.topArticles.push(el);
        return obj;
      }
      obj.articles.push(el);
      return obj;
    },
    {
      topArticles: [] as (BlogPosts_blogPosts_articles | null)[],
      articles: [] as (BlogPosts_blogPosts_articles | null)[],
    },
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const buildStaticPaths = (data: BlogPosts) => {
  const articles = getSectionsData(['articles'], data?.blogPosts);
  const pageCount = Math.ceil(
    (sortingArticles.call(articles)?.articles?.length || 0) / ARTICLES_PER_PAGE,
  );
  let paths = [] as any[];
  for (let i = 1; i <= pageCount; i += 1) {
    paths = [...paths, { params: { pageNumber: i.toString() } }];
  }
  return paths;
};
