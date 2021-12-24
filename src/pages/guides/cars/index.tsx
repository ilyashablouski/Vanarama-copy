import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';

import { decodeData } from '../../../utils/data';
import { IPageWithError } from '../../../types/common';
import createApolloClient from '../../../apolloClient';
import { getSectionsData } from '../../../utils/getSectionsData';
import { getBreadCrumbsItems } from '../../../utils/breadcrumbs';

import {
  IReviewHubPage,
  getReviewsHubCategoryStaticProps,
} from '../../../containers/VehicleReviewCategoryContainer/gql';
import VehicleReviewCategoryContainer from '../../../containers/VehicleReviewCategoryContainer';

const CarsGuides: NextPage<IReviewHubPage> = ({ data: encodedData }) => {
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);

  return (
    <VehicleReviewCategoryContainer
      data={data}
      breadcrumbsItems={breadcrumbsItems}
    />
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IReviewHubPage | IPageWithError>> {
  const client = createApolloClient({});
  return getReviewsHubCategoryStaticProps(client, 'guides/cars', context);
}

export default CarsGuides;
