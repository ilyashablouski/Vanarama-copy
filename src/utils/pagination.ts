/* eslint-disable @typescript-eslint/camelcase */
import { ApolloClient, DocumentNode } from '@apollo/client';
import { GetStaticPropsContext } from 'next';
import {
  BlogPosts,
  BlogPosts_blogPosts_articles,
} from '../../generated/BlogPosts';
import { encodeData } from './data';
import { getSectionsData } from './getSectionsData';

export const ARTICLES_PER_PAGE = 9;

export const getBlogPosts = async (
  client: ApolloClient<any>,
  query: DocumentNode,
  slug: string,
  context: GetStaticPropsContext,
) => {
  try {
    const { data: blogPosts, errors } = await client.query({
      query,
      variables: {
        slug,
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }

    // Obfuscate data from Googlebot
    const data = encodeData(blogPosts);

    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
        pageNumber:
          parseInt((context?.params?.pageNumber as string) || '', 10) || null,
      },
    };
  } catch (err) {
    return {
      revalidate: 1,
      props: {
        data: null,
        pageNumber: null,
      },
    };
  }
};

export function sortingArticles(this: any[]) {
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
