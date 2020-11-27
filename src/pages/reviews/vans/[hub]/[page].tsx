import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import { useRouter } from 'next/router';
import { useReviewsPageQuery } from '../../../../containers/VehicleReviewContainer/gql';
import withApollo from '../../../../hocs/withApollo';
import VehicleReviewContainer from '../../../../containers/VehicleReviewContainer/VehicleReviewContainer';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import Head from '../../../../components/Head/Head';

const ReviewPage: NextPage = () => {
  const router = useRouter();

  const { data, loading, error } = useReviewsPageQuery(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.reviewsPage) {
    return null;
  }

  const title = getSectionsData(['metaData', 'name'], data?.reviewsPage);
  const body = getSectionsData(['body'], data?.reviewsPage);
  const sections = getSectionsData(['sections'], data?.reviewsPage);
  const metaData = getSectionsData(['metaData'], data.reviewsPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.reviewsPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <VehicleReviewContainer
        body={body}
        title={title}
        sections={sections}
        breadcrumbsItems={breadcrumbsItems}
      />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default withApollo(ReviewPage, { getDataFromTree });
