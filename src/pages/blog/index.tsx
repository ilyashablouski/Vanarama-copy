import { NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import createApolloClient from '../../apolloClient';
import {
  GENERIC_PAGE,
  GENERIC_PAGE_HEAD,
  IGenericPage,
} from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import CategoryPageContainer from '../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../utils/getSectionsData';

const CategoryPage: NextPage<IGenericPage> = ({ pageHead, data, error }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const tiles = getSectionsData(['sections', 'tiles'], data?.genericPage);
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);
  const carousel = getSectionsData(['sections', 'carousel'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], pageHead?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <CategoryPageContainer
      breadcrumbsItems={breadcrumbsItems}
      featured={featured}
      carousel={carousel}
      metaData={metaData}
      tiles={tiles}
      featuredImage={data?.genericPage.featuredImage}
    />
  );
};

export async function getStaticProps(context: NextPageContext) {
  try {
    const client = createApolloClient({}, context);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'blog',
      },
    });
    const { data: pageHead } = await client.query({
      query: GENERIC_PAGE_HEAD,
      variables: {
        slug: 'blog',
      },
    });
    return {
      props: { data, pageHead, error: errors ? errors[0] : null },
    };
  } catch {
    return {
      props: { error: true },
    };
  }
}

export default withApollo(CategoryPage);
