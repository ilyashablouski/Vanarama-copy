import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import { useGenericPageTestimonials } from '../../containers/CustomerTestimonialsContainer/gql';
import CustomerTestimonialsContainer from '../../containers/CustomerTestimonialsContainer/CustomerTestimonialsContainer';
import withApollo from '../../hocs/withApollo';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';

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
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);

  return (
    <>
      <CustomerTestimonialsContainer
        body={body}
        title={metaDataName}
        sections={sections}
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

export default withApollo(CustomerTestimonialPage, { getDataFromTree });
