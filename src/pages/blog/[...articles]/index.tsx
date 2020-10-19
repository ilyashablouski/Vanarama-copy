import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { getArticles, getArticlesSlug } from '../../../utils/articles';
import withApollo from '../../../hocs/withApollo';
import { useBlogPostPage } from '../../../gql/blogPost';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../utils/getSectionsData';
import { useBlogPostsPage } from '../../../gql/blogPosts';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useBlogPostPage(router.asPath.slice(1));

  const {
    data: blogPosts,
    loading: blogPostsLoading,
    error: blogPostsError,
  } = useBlogPostsPage(getArticlesSlug(router));

  if (loading || blogPostsLoading) {
    return <Loading size="large" />;
  }

  if (error || blogPostsError) {
    return (
      <ErrorMessage message={error?.message || blogPostsError?.message || ''} />
    );
  }

  const articles = getSectionsData(['blogPosts', 'articles'], blogPosts);
  const body = getSectionsData(['body'], data?.blogPost);
  const name = getSectionsData(['metaData', 'name'], data?.blogPost);
  const image = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.blogPost,
  );
  const metaData = getSectionsData(['metaData'], data?.blogPost);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <BlogPostContainer
      articles={getArticles(articles, router)}
      body={body}
      name={name}
      image={image}
      breadcrumbsItems={breadcrumbsItems}
      metaData={metaData}
    />
  );
};

export default withApollo(BlogPost);
