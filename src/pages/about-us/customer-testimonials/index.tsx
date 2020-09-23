import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useGenericPageTestimonials } from '../../../containers/CustomerTestimonialsContainer/gql';
import CustomerTestimonialsContainer from '../../../containers/CustomerTestimonialsContainer/CustomerTestimonialsContainer';
import Head from '../../../components/Head/Head';
import withApollo from '../../../hocs/withApollo';

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
      <CustomerTestimonialsContainer
        body={body}
        title={metaData?.name}
        sections={sections}
      />
      <Head
        metaData={metaData}
        featuredImage={data?.genericPage.featuredImage}
      />
    </>
  );
};

export default withApollo(CustomerTestimonialPage, { getDataFromTree });
