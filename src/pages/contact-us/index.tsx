import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';

import withApollo from '../../hocs/withApollo';

import BreadCrumbContainer from '../../containers/BreadCrumbContainer';

const ContactUsPage: NextPage = () => {
  const { data, loading, error } = useQuery(CONTACT_US_CONTENT);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="row:title">
        <BreadCrumbContainer />
        <Heading size="xlarge" color="black">
          Contact Us
        </Heading>
      </div>
      <section className="row:featured-right">..</section>
    </>
  );
};

export default withApollo(ContactUsPage, { getDataFromTree });
