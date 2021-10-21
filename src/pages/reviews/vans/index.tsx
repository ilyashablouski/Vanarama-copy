import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import DefaultErrorPage from 'next/error';
import VehicleReviewCategoryContainer from '../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import createApolloClient from '../../../apolloClient';
import { getSectionsData } from '../../../utils/getSectionsData';
import { getReviewsHubCategoryStaticProps } from '../../../containers/VehicleReviewCategoryContainer/gql';
import { decodeData } from '../../../utils/data';

interface IReviewHub {
  data: any;
  loading: boolean;
  error: ApolloError | undefined;
}

const ReviewHub: NextPage<IReviewHub> = ({ data: encodedData, error }) => {
  const data = decodeData(encodedData);

  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

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

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  return getReviewsHubCategoryStaticProps(client, 'reviews/vans', context);
}

export default ReviewHub;
