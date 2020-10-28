/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/prefer-default-export */
import { BlogPosts_blogPosts } from '../../generated/BlogPosts';

export const getPaths = (blogPosts: BlogPosts_blogPosts | undefined | null) => {
  const slugs = blogPosts?.articles?.map(article =>
    article?.slug?.split('/').pop(),
  );
  const paths = slugs?.map(slug => {
    if (slug) {
      return {
        params: { articles: [slug] },
      };
    }
    return false;
  });
  return paths?.filter(path => path);
};
