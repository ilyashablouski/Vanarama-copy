import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import SchemaJSON from 'core/atoms/schema-json';
import DefaultErrorPage from 'next/error';
import { PreviewNextPageContext } from 'types/common';
import createApolloClient from '../../../../apolloClient';
import VehicleReviewCategoryContainer from '../../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import {
  getReviewsHubCategoryStaticPath,
  getReviewsHubCategoryStaticProps,
} from '../../../../containers/VehicleReviewCategoryContainer/gql';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { ReviewsHubCategoryQuery } from '../../../../../generated/ReviewsHubCategoryQuery';
import Head from '../../../../components/Head/Head';
import { decodeData } from '../../../../utils/data';

export interface IElectricGuidesPage {
  data: ReviewsHubCategoryQuery | undefined;
  error: ApolloError | undefined;
  pageNumber?: number;
}

const ElectricGuidesPage: NextPage<IElectricGuidesPage> = ({
  data: encodedData,
  pageNumber,
  error,
}) => {
  const data = decodeData(encodedData);

  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

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

export async function getStaticPaths(context: PreviewNextPageContext) {
  const client = createApolloClient({});
  return getReviewsHubCategoryStaticPath(client, 'guides/electric', context);
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  return getReviewsHubCategoryStaticProps(client, 'guides/electric', context);
}

export default ElectricGuidesPage;
