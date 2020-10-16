import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useGenericPageTestimonials } from '../../containers/CustomerTestimonialsContainer/gql';
import CustomerTestimonialsContainer from '../../containers/CustomerTestimonialsContainer/CustomerTestimonialsContainer';
import withApollo from '../../hocs/withApollo';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../utils/getSectionsData';

const CustomerTestimonialPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPageTestimonials(
    router.asPath.slice(1),
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaDataName = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);

  return (
    <CustomerTestimonialsContainer
      body={body}
      title={metaDataName}
      sections={sections}
    />
  );
};

export default withApollo(CustomerTestimonialPage, { getDataFromTree });
