import { NextPage, NextPageContext } from 'next';
import createApolloClient from '../../apolloClient';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import CategoryPageContainer from '../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../utils/getSectionsData';

const CategoryPage: NextPage<IGenericPage> = ({ data }) => {
  const tiles = getSectionsData(['sections', 'tiles'], data?.genericPage);
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);
  const carousel = getSectionsData(['sections', 'carousel'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
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
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      props: { data },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default withApollo(CategoryPage);
