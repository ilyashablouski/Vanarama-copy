import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../../apolloClient';
import { BLOG_POSTS_PAGE } from '../../../gql/blogPosts';
import withApollo from '../../../hocs/withApollo';
import CategoryPageContainer from '../../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../../utils/getSectionsData';
import { IBlogCategory } from '../../../models/IBlogsProps';
import { decodeData, encodeData } from '../../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import {
  convertSlugToBreadcrumbsSchema,
  getBreadCrumbsItems,
} from '../../../utils/breadcrumbs';
import { BlogPosts, BlogPostsVariables } from '../../../../generated/BlogPosts';
import { convertErrorToProps } from '../../../utils/helpers';
import ErrorPage from '../../_error';

const CategoryPage: NextPage<IBlogCategory> = ({
  data: encodedData,
  error,
}) => {
  if (error || !encodedData) {
    return <ErrorPage errorData={error} />;
  }

  // De-obfuscate data for user
  const data = decodeData(encodedData);

  const articles = getSectionsData(['articles'], data?.blogPosts);
  const pageTitle = getSectionsData(['pageTitle'], data?.blogPosts);
  const metaData = getSectionsData(['metaData'], data?.blogPosts);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);
  const breadcrumbsSchema = convertSlugToBreadcrumbsSchema(metaData.slug);

  return (
    <>
      <CategoryPageContainer
        breadcrumbsItems={breadcrumbsItems}
        metaData={metaData}
        articles={articles}
        pageTitle={pageTitle}
      />
      {metaData.slug && !metaData.schema && (
        <SchemaJSON json={JSON.stringify(breadcrumbsSchema)} />
      )}
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data: blogPosts } = await client.query<
      BlogPosts,
      BlogPostsVariables
    >({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/cars',
        isPreview: !!context?.preview,
      },
    });

    // Obfuscate data from Googlebot
    const data = encodeData(blogPosts);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        data,
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
}

export default withApollo(CategoryPage);
