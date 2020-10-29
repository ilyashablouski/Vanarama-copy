/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/prefer-default-export */
import { BlogPosts_blogPosts } from '../../generated/BlogPosts';

export const getPaths = (blogPosts: BlogPosts_blogPosts | undefined | null) => {
  const slugs = blogPosts?.articles?.map(article =>
    article?.slug?.split('/').pop(),
  );
  const notEmptySlugs = slugs?.filter(slug => slug);
  return notEmptySlugs?.map(slug => ({
    params: { articles: [slug] },
  }));
};
