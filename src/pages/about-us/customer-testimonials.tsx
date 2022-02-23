import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { GENERIC_PAGE_TESTIMONIALS } from '../../containers/CustomerTestimonialsContainer/gql';
import CustomerTestimonialsContainer from '../../containers/CustomerTestimonialsContainer/CustomerTestimonialsContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import createApolloClient from '../../apolloClient';
import {
  GenericPageTestimonialsQuery,
  GenericPageTestimonialsQueryVariables,
} from '../../../generated/GenericPageTestimonialsQuery';
import { TESTIMONIALS_DATA } from '../../gql/testimonials';
import {
  TestimonialsData,
  TestimonialsDataVariables,
} from '../../../generated/TestimonialsData';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../types/common';
import { getBreadCrumbsItems } from '../../utils/breadcrumbs';
import { getServiceBannerData } from '../../utils/serviceBannerHelper';

type IProps = IPageWithData<{
  data: GenericPageTestimonialsQuery;
  testimonialsData: TestimonialsData;
}>;

const CustomerTestimonialPage: NextPage<IProps> = ({
  data,
  testimonialsData,
}) => {
  const metaDataName = getSectionsData(['metaData', 'name'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const breadcrumbsItems = getBreadCrumbsItems(metaData);

  return (
    <>
      <CustomerTestimonialsContainer
        body={body}
        title={metaDataName}
        sections={sections}
        breadcrumbsItems={breadcrumbsItems}
        initialTestimonials={testimonialsData?.testimonials}
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

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});

    const [
      genericTestimonialsPageQuery,
      testimonialsDataQuery,
      { serviceBanner },
    ] = await Promise.all([
      client.query<
        GenericPageTestimonialsQuery,
        GenericPageTestimonialsQueryVariables
      >({
        query: GENERIC_PAGE_TESTIMONIALS,
        variables: {
          slug: 'about-us/customer-testimonials',
          isPreview: !!context?.preview,
        },
      }),
      client.query<TestimonialsData, TestimonialsDataVariables>({
        query: TESTIMONIALS_DATA,
        variables: {
          size: 4,
          page: 1,
        },
      }),
      getServiceBannerData(client),
    ]);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: genericTestimonialsPageQuery.data,
        testimonialsData: testimonialsDataQuery.data,
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default CustomerTestimonialPage;
