import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import withApollo from '../../../hocs/withApollo';
import CategoryPageContainer from '../../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../../utils/getSectionsData';
import { IBlogCategory } from '../../../models/IBlogsProps';
import createApolloClient from '../../../apolloClient';
import { BLOG_POSTS_PAGE } from '../../../gql/blogPosts';
import { decodeData, encodeData } from '../../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';

const CategoryPage: NextPage<IBlogCategory> = ({
  data: encodedData,
  error,
}) => {
  // De-obfuscate data for user
  const data = decodeData(encodedData);

  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const articles = getSectionsData(['articles'], data?.blogPosts);
  const pageTitle = getSectionsData(['pageTitle'], data?.blogPosts);
  const metaData = getSectionsData(['metaData'], data?.blogPosts);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <CategoryPageContainer
      breadcrumbsItems={breadcrumbsItems}
      metaData={metaData}
      articles={articles}
      pageTitle={pageTitle}
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data: blogPosts, errors } = await client.query({
      query: BLOG_POSTS_PAGE,
      variables: {
        slug: 'blog/vans',
      },
    });

    // Obfuscate data from Googlebot
    const data = encodeData(blogPosts);

    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL) ||
        Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
        Number(DEFAULT_REVALIDATE_INTERVAL_ERROR),
      props: {
        error: true,
      },
    };
  }
}

export default withApollo(CategoryPage);
