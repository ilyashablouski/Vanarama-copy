import { NextPage } from 'next';
import React from 'react';

import Loading from 'core/atoms/loading';

import CheckoutPageContainer from '../../containers/CheckoutPageContainer';
import useGetOrder from '../../hooks/useGetOrder';

const CheckoutPage: NextPage = () => {
  const order = useGetOrder();

  return order ? (
    <CheckoutPageContainer order={order!} />
  ) : (
    <Loading size="xlarge" />
  );
};

export default CheckoutPage;
