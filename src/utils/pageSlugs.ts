/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/prefer-default-export */
import { BlogPosts_blogPosts } from '../../generated/BlogPosts';
import {
  GenericPageQuery_genericPage,
  GenericPageQuery_genericPage_sections_cards_cards,
} from '../../generated/GenericPageQuery';
import { PageCollection_pageCollection_items } from '../../generated/PageCollection';
import { getSectionsData } from './getSectionsData';

export const getBlogPaths = (
  blogPosts: BlogPosts_blogPosts | undefined | null,
) => {
  const slugs = blogPosts?.articles?.map(article =>
    article?.slug?.split('/').pop(),
  );
  const notEmptySlugs = slugs?.filter(slug => slug);
  return notEmptySlugs?.map(slug => ({
    params: { articles: [slug] },
  }));
};

export const getLeasingPaths = (
  genericPage: GenericPageQuery_genericPage | undefined | null,
) => {
  const cards = getSectionsData(['sections', 'cards', 'cards'], genericPage);
  const slugs = cards.map(
    (card: GenericPageQuery_genericPage_sections_cards_cards) =>
      card?.link?.url?.split('/').pop(),
  );
  const notEmptySlugs = slugs?.filter(
    (slug: string | null | undefined) => slug,
  );
  return notEmptySlugs?.map((slug: string) => ({
    params: { explained: slug.replace('.html', '') },
  }));
};

export const getPathsFromPageCollection = (
  items: (PageCollection_pageCollection_items | null)[] | null | undefined,
) => {
  return items
    ?.filter(item => (item?.slug ? item?.slug?.split('/')?.length > 1 : false))
    .map(item => `/${item?.slug}`);
};
