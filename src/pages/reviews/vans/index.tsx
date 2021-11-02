import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import VehicleReviewCategoryContainer from '../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import createApolloClient from '../../../apolloClient';
import { getSectionsData } from '../../../utils/getSectionsData';
import {
  getReviewsHubCategoryStaticProps,
  IReviewHubPage,
} from '../../../containers/VehicleReviewCategoryContainer/gql';
import { decodeData } from '../../../utils/data';
import { PageTypeEnum } from '../../../types/common';
import ErrorPage from '../../_error';

const ReviewHub: NextPage<IReviewHubPage> = props => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.pageType === PageTypeEnum.ERROR) {
    return <ErrorPage errorData={props.error} />;
  }

  const { data: encodedData } = props;
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <VehicleReviewCategoryContainer
      data={data}
      breadcrumbsItems={breadcrumbsItems}
    />
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IReviewHubPage>> {
  const client = createApolloClient({});
  return getReviewsHubCategoryStaticProps(client, 'reviews/vans', context);
}

export default ReviewHub;
