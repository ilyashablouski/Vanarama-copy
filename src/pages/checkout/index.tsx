import React from 'react';
import Cookies from 'js-cookie';
import { NextPage } from 'next';

import Loading from 'core/atoms/loading';
import CheckoutPageContainer from '../../containers/CheckoutPageContainer';
import useGetOrder from '../../hooks/useGetOrder';
import useGetQuote from '../../hooks/useGetQuote';
import { useCarDerivativeQuery } from '../../gql/order';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';

const CheckoutPage: NextPage = () => {
  const order = useGetOrder();
  const quote = useGetQuote();
  const vehicleProduct = order?.lineItems?.[0]?.vehicleProduct;

  const { data, loading } = useCarDerivativeQuery(
    vehicleProduct?.derivativeCapId,
    vehicleProduct?.vehicleType,
  );

  if (Cookies.get('DIG-6240') !== '1') {
    return <PageNotFoundContainer name="Checkout" />;
  }
  if (loading || !order || !quote) {
    return <Loading size="xlarge" />;
  }

  return (
    <CheckoutPageContainer
      order={order}
      quote={quote}
      derivative={data?.derivative}
      vehicleImages={data?.vehicleImages}
      vehicleConfiguration={data?.vehicleConfigurationByCapId}
    />
  );
};

export default CheckoutPage;
