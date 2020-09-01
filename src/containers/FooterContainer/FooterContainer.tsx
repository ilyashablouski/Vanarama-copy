import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import withApollo from '../../hocs/withApollo';
import { PRIMARY_FOOTER } from '../../gql/header';
import { PrimaryFooter } from '../../../generated/PrimaryFooter';
import Footer from '../../components/Footer';

const FooterContainer: FC = () => {
  const { data, loading } = useQuery<PrimaryFooter>(PRIMARY_FOOTER);

  if (loading) {
    return <></>;
  }

  if (!data) {
    return <></>;
  }

  return <Footer primaryFooter={data.primaryFooter} />;
};

export default withApollo(FooterContainer);
