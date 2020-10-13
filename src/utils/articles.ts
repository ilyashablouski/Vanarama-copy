/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/camelcase */
import moment from 'moment';
import { NextRouter } from 'next/router';
import { BlogPosts_blogPosts_articles } from '../../generated/BlogPosts';

export const getArticles = (
  articles: (BlogPosts_blogPosts_articles | null)[] | null | undefined,
  router: NextRouter,
) => {
  const articlesSorted = articles
    ? [...articles]?.sort((firstArticle, secondArticle) =>
        moment(secondArticle?.publishedOn).diff(
          moment(firstArticle?.publishedOn),
        ),
      )
    : [];

  let firstArticles = articlesSorted.slice(0, 3);
  const isCurrentBlog = firstArticles.find(
    article => article?.slug === router.asPath.slice(1),
  );

  if (isCurrentBlog) {
    const index = firstArticles.indexOf(isCurrentBlog);
    firstArticles.splice(index, 1);
    firstArticles = [...firstArticles, ...articlesSorted.slice(3, 4)];
  }
  return firstArticles;
};

export const getBody = (body: string) => {
  const bodyShort = body.slice(0, 100);
  return `${bodyShort?.replace(/\**/g, '')}...`;
};
