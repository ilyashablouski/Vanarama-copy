import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import createApolloClient from '../../../../apolloClient';
import VehicleReviewCategoryContainer from '../../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import { GENERIC_PAGE_QUESTION } from '../../../../containers/VehicleReviewCategoryContainer/gql';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { ReviewsHubCategoryQuery } from '../../../../../generated/ReviewsHubCategoryQuery';
import Head from '../../../../components/Head/Head';

export interface IReviewHubPage {
  data: ReviewsHubCategoryQuery | undefined;
  error: ApolloError | undefined;
  pageNumber?: number;
}

const ReviewHub: NextPage<IReviewHubPage> = ({ data, error, pageNumber }) => {
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const metaData = getSectionsData(['metaData'], data?.genericPage);

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
      {metaData && <Head metaData={metaData} featuredImage={null} />}
    </>
  );
};

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query({
    query: GENERIC_PAGE_QUESTION,
    variables: {
      slug: 'reviews/vans',
    },
  });
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );

  let paths = [] as any[];
  const countPages = Math.ceil((cards.length || 0) / 12);
  for (let i = 1; i <= countPages; i += 1) {
    paths = [...paths, { params: { pageNumber: i.toString() } }];
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);

  const { data, error } = await client.query({
    query: GENERIC_PAGE_QUESTION,
    variables: {
      slug: 'reviews/vans',
    },
  });
  return {
    props: {
      data,
      error: error || null,
      pageNumber:
        parseInt((context?.params?.pageNumber as string) || '', 10) || null,
    },
  };
}

export default ReviewHub;
