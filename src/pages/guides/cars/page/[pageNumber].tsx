import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';

import { IPageWithError } from 'types/common';
import { decodeData } from '../../../../utils/data';
import createApolloClient from '../../../../apolloClient';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { getBreadCrumbsItems } from '../../../../utils/breadcrumbs';

import {
  IReviewHubPage,
  getReviewsHubCategoryStaticPath,
  getReviewsHubCategoryStaticProps,
} from '../../../../containers/VehicleReviewCategoryContainer/gql';
import VehicleReviewCategoryContainer from '../../../../containers/VehicleReviewCategoryContainer';

const CarsGuidesPage: NextPage<IReviewHubPage> = ({
  data: encodedData,
  pageNumber,
}) => {
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);

  return (
    <VehicleReviewCategoryContainer
      data={data}
      pageNumber={pageNumber}
      breadcrumbsItems={breadcrumbsItems}
    />
  );
};

export async function getStaticPaths(context: GetStaticPropsContext) {
  const client = createApolloClient({});
  return getReviewsHubCategoryStaticPath(client, 'guides/cars', context);
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IReviewHubPage | IPageWithError>> {
  const client = createApolloClient({});
  return getReviewsHubCategoryStaticProps(client, 'guides/cars', context);
}

export default CarsGuidesPage;
