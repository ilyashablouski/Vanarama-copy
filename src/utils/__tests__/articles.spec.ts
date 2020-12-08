import { NextRouter } from 'next/router';
import { getArticles, getBody, getArticlesSlug } from '../articles';

describe('articles', () => {
  describe('getArticles', () => {
    it('getArticles should return empty array when we have empty articles', () => {
      const actual = getArticles([], { asPath: '' } as NextRouter);

      expect(actual).toEqual([]);
    });

    it('getArticles should return array with first articles', () => {
      const actual = getArticles(
        [
          {
            intro: null,
            name: null,
            publishedOn: '2020-10-17T03:24:00',
            featuredImage: null,
            isFeatured: null,
            title: null,
            tags: null,
            slug: 'slug',
            excerpt: null,
            legacyUrl: null,
          },
          {
            intro: null,
            name: null,
            publishedOn: '2020-11-17T03:24:00',
            featuredImage: null,
            isFeatured: null,
            title: null,
            tags: null,
            slug: 'asPath',
            excerpt: null,
            legacyUrl: null,
          },
        ],
        { asPath: '/asPath' } as NextRouter,
      );

      expect(actual).toEqual([
        {
          intro: null,
          name: null,
          publishedOn: '2020-10-17T03:24:00',
          featuredImage: null,
          isFeatured: null,
          title: null,
          tags: null,
          slug: 'slug',
          excerpt: null,
          legacyUrl: null,
        },
      ]);
    });
  });
  describe('getBody', () => {
    it('getBody should return full body with ... if length less 100 charters', () => {
      const actual = getBody(
        'If you want to upgrade to a brand new car, van or truck',
      );

      expect(actual).toEqual(
        'If you want to upgrade to a brand new car, van or truck...',
      );
    });
    it('getBody should return short body with ...', () => {
      const actual = getBody(
        `If you want to upgrade to a brand new car, van or truck without the high price tag & hassle, leasing might just be for you! Leasing is the smartest way to upgrade what you drive. It's affordable, simple and you're not left with a depreciating asset at the end of your contract.`,
      );

      expect(actual).toEqual(
        'If you want to upgrade to a brand new car, van or truck without the high price tag & hassle, leasing...',
      );
    });
  });

  describe('getArticlesSlug', () => {
    it('getArticlesSlug should return empty string', () => {
      const actual = getArticlesSlug({ pathname: '' } as NextRouter);

      expect(actual).toEqual('');
    });
    it('getArticlesSlug should return slug', () => {
      const actual = getArticlesSlug({ pathname: '/blog/vans' } as NextRouter);

      expect(actual).toEqual('blog');
    });
  });
});
