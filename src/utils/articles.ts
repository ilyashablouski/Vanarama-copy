/* eslint-disable import/prefer-default-export */

import { NextRouter } from 'next/router';
import { BlogPosts_blogPosts_articles } from '../../generated/BlogPosts';

export const getArticles = (
  articles: (BlogPosts_blogPosts_articles | null)[] | null | undefined,
  path: string,
) => {
  const articlesSorted = articles
    ? [...articles]?.sort(
        (firstArticle, secondArticle) =>
          new Date(secondArticle?.metaData?.publishedOn).getTime() -
          new Date(firstArticle?.metaData?.publishedOn).getTime(),
      )
    : null;

  let firstArticles = articlesSorted?.slice(0, 3);
  const isCurrentBlog = firstArticles?.find(
    article => article?.slug === path?.slice(1),
  );

  if (isCurrentBlog) {
    const index = firstArticles?.indexOf(isCurrentBlog);
    firstArticles?.splice(index || 0, 1);
    firstArticles = [...firstArticles, ...articlesSorted?.slice(3, 4)];
  }
  return firstArticles;
};

export const getBody = (body: string) => {
  const bodyShort = body.slice(0, 100);
  return `${bodyShort?.replace(/\**/g, '')}...`;
};

export const getArticlesSlug = (router: NextRouter) => {
  const items = router.pathname.slice(1).split('/');
  items.pop();
  return items ? items.join('/') : '';
};
