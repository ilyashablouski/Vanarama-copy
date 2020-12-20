import dynamic from 'next/dynamic';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import DefaultErrorPage from 'next/error';
import SchemaJSON from 'core/atoms/schema-json';
import { GENERIC_PAGE_TESTIMONIALS } from '../../containers/CustomerTestimonialsContainer/gql';
import CustomerTestimonialsContainer from '../../containers/CustomerTestimonialsContainer/CustomerTestimonialsContainer';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import createApolloClient from '../../apolloClient';
import { GenericPageTestimonialsQuery } from '../../../generated/GenericPageTestimonialsQuery';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

interface ICustomerTestimonialPage {
  data: GenericPageTestimonialsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

const CustomerTestimonialPage: NextPage<ICustomerTestimonialPage> = ({
  data,
  error,
  loading,
}) => {
  if (loading) {
    return <Loading size="large" />;
  }

  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
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
    const { data, errors } = await client.query({
      query: GENERIC_PAGE_TESTIMONIALS,
      variables: {
        slug: 'about-us/customer-testimonials',
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default CustomerTestimonialPage;
