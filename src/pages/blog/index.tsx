import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { useGenericPage, useGenericPageHead } from '../../gql/genericPage';
import withApollo from '../../hocs/withApollo';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import CategoryPageContainer from '../../containers/CategoryPageContainer/CategoryPageContainer';
import { getSectionsData } from '../../utils/getSectionsData';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));
  const { data: pageHead } = useGenericPageHead(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error?.message} />;
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

export default withApollo(CategoryPage);
