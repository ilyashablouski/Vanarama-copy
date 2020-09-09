import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useGenericPageTestimonials } from '../../../containers/CustomerTestimonialsContainer/gql';
import CustomerTestimonialsContainer from '../../../containers/CustomerTestimonialsContainer/CustomerTestimonialsContainer';
import Head from '../../../components/Head/Head';
import withApollo from '../../../hocs/withApollo';

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Ask A Question About Van Leasing', href: '/van-leasing-questions' },
];

const CustomerTestimonialPage: NextPage = () => {
  const { data, loading, error } = useGenericPageTestimonials(
    `/about-us/customer-testimonials`,
  );

  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaData = data?.genericPage?.metaData;
  const sections = data.genericPage?.sections;
  const body = data.genericPage?.body;

  return (
    <>
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
      <CustomerTestimonialsContainer
        crumbs={crumbs}
        body={body}
        title={metaData?.name}
        sections={sections}
      />
    </>
  );
};

export default withApollo(CustomerTestimonialPage, { getDataFromTree });
