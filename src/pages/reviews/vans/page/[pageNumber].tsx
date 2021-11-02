import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { PageTypeEnum } from 'types/common';
import createApolloClient from '../../../../apolloClient';
import VehicleReviewCategoryContainer from '../../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import {
  getReviewsHubCategoryStaticPath,
  getReviewsHubCategoryStaticProps,
  IReviewHubPage,
} from '../../../../containers/VehicleReviewCategoryContainer/gql';
import { getSectionsData } from '../../../../utils/getSectionsData';
import Head from '../../../../components/Head/Head';
import { decodeData } from '../../../../utils/data';
import ErrorPage from '../../../_error';

const ReviewHub: NextPage<IReviewHubPage> = props => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.pageType === PageTypeEnum.ERROR) {
    return <ErrorPage errorData={props.error} />;
  }

  const { data: encodedData, pageNumber } = props;
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <VehicleReviewCategoryContainer
        data={data}
        pageNumber={pageNumber}
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

export async function getStaticPaths(context: GetStaticPropsContext) {
  const client = createApolloClient({});
  return getReviewsHubCategoryStaticPath(client, 'reviews/vans', context);
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IReviewHubPage>> {
  const client = createApolloClient({}, context);
  return getReviewsHubCategoryStaticProps(client, 'reviews/vans', context);
}

export default ReviewHub;
