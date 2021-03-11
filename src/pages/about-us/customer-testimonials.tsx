import dynamic from 'next/dynamic';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { GENERIC_PAGE_TESTIMONIALS } from '../../containers/CustomerTestimonialsContainer/gql';
import CustomerTestimonialsContainer from '../../containers/CustomerTestimonialsContainer/CustomerTestimonialsContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import createApolloClient from '../../apolloClient';
import { GenericPageTestimonialsQuery } from '../../../generated/GenericPageTestimonialsQuery';
import Skeleton from '../../components/Skeleton';
import { TESTIMONIALS_DATA } from '../../gql/testimonials';
import { TestimonialsData } from '../../../generated/TestimonialsData';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

interface ICustomerTestimonialPage {
  data: GenericPageTestimonialsQuery | undefined;
  loading: boolean;
  testimonialsData: TestimonialsData | undefined;
}

const CustomerTestimonialPage: NextPage<ICustomerTestimonialPage> = ({
  data,
  loading,
  testimonialsData,
}) => {
  if (loading) {
    return <Loading size="large" />;
  }

  const metaDataName = getSectionsData(['metaData', 'name'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

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

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const [
      genericTestimonialsPageQuery,
      testimonialsDataQuery,
    ] = await Promise.all([
      client.query({
        query: GENERIC_PAGE_TESTIMONIALS,
        variables: {
          slug: 'about-us/customer-testimonials',
        },
      }),
      client.query({
        query: TESTIMONIALS_DATA,
        variables: { size: 4, page: 1 },
      }),
    ]);
    const error =
      genericTestimonialsPageQuery.error || testimonialsDataQuery.error;
    if (error) {
      throw new Error(error.message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data: genericTestimonialsPageQuery.data,
        testimonialsData: testimonialsDataQuery.data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default CustomerTestimonialPage;
