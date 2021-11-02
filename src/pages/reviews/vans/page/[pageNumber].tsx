import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { IPageWithError } from 'types/common';
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

const ReviewHub: NextPage<IReviewHubPage> = ({
  data: encodedData,
  pageNumber,
}) => {
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
): Promise<GetStaticPropsResult<IReviewHubPage | IPageWithError>> {
  const client = createApolloClient({});
  return getReviewsHubCategoryStaticProps(client, 'reviews/vans', context);
}

export default ReviewHub;
