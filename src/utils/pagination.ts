/* eslint-disable @typescript-eslint/camelcase */
import { ApolloClient, DocumentNode } from '@apollo/client';
import { GetStaticPropsContext } from 'next';
import {
  BlogPosts,
  BlogPosts_blogPosts_articles,
} from '../../generated/BlogPosts';
import { getSectionsData } from './getSectionsData';

export const ARTICLES_PER_PAGE = 9;

export const getBlogPosts = async (
  client: ApolloClient<any>,
  query: DocumentNode,
  slug: string,
  context: GetStaticPropsContext,
) => {
  try {
    const { data, errors } = await client.query({
      query,
      variables: {
        slug,
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
        pageNumber:
          parseInt((context?.params?.pageNumber as string) || '', 10) || null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
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

export const buildStaticPathes = (data: BlogPosts) => {
  const articles = getSectionsData(['articles'], data?.blogPosts);
  const pageCount = Math.ceil(
    (sortingArticles.call(articles).articles.length || 0) / ARTICLES_PER_PAGE,
  );
  let paths = [] as any[];
  for (let i = 1; i < pageCount; i += 1) {
    paths = [...paths, { params: { pageNumber: i.toString() } }];
  }
  return paths;
};