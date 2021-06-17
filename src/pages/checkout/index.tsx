import React from 'react';
import Cookies from 'js-cookie';
import { NextPage } from 'next';

import Loading from 'core/atoms/loading';
import CheckoutPageContainer from '../../containers/CheckoutPageContainer';
import useGetOrder from '../../hooks/useGetOrder';
import { useCarDerivativeQuery } from '../../gql/order';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';

const CheckoutPage: NextPage = () => {
  const order = useGetOrder();
  const vehicleProduct = order?.lineItems?.[0]?.vehicleProduct;

  const { data, loading } = useCarDerivativeQuery(
    vehicleProduct?.derivativeCapId,
    vehicleProduct?.vehicleType,
  );

  if (Cookies.get('DIG-6240') !== '1') {
    return <PageNotFoundContainer name="Checkout" />;
  }

  if (loading || !order) {
    return <Loading size="xlarge" />;
  }

  return (
    <CheckoutPageContainer
      order={order}
      derivative={data?.derivative}
      vehicleImages={data?.vehicleImages}
      vehicleConfiguration={data?.vehicleConfigurationByCapId}
    />
  );
};

export default CheckoutPage;
