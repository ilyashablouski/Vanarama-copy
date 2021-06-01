import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import SchemaJSON from 'core/atoms/schema-json';
import DefaultErrorPage from 'next/error';
import createApolloClient from '../../../../apolloClient';
import VehicleReviewCategoryContainer from '../../../../containers/VehicleReviewCategoryContainer/VehicleReviewCategoryContainer';
import { GENERIC_PAGE_QUESTION_HUB } from '../../../../containers/VehicleReviewCategoryContainer/gql';
import { getSectionsData } from '../../../../utils/getSectionsData';
import { ReviewsHubCategoryQuery } from '../../../../../generated/ReviewsHubCategoryQuery';
import Head from '../../../../components/Head/Head';
import { decodeData, encodeData } from '../../../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../../utils/env';

export interface IReviewHubPage {
  data: ReviewsHubCategoryQuery | undefined;
  error: ApolloError | undefined;
  pageNumber?: number;
}

const ReviewHub: NextPage<IReviewHubPage> = ({
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

export async function getStaticPaths() {
  const client = createApolloClient({});

  const { data } = await client.query({
    query: GENERIC_PAGE_QUESTION_HUB,
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
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  try {
    const { data, errors } = await client.query({
      query: GENERIC_PAGE_QUESTION_HUB,
      variables: {
        slug: 'reviews/vans',
      },
    });

    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL) ||
        Number(DEFAULT_REVALIDATE_INTERVAL),
      props: {
        data: encodeData(data),
        error: errors ? errors[0] : null,
        pageNumber:
          parseInt((context?.params?.pageNumber as string) || '', 10) || null,
      },
    };
  } catch {
    return {
      revalidate:
        Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
        Number(DEFAULT_REVALIDATE_INTERVAL_ERROR),
      props: {
        error: true,
      },
      notFound: true,
    };
  }
}

export default ReviewHub;
