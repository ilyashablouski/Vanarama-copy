import React from 'react';
import Cookies from 'js-cookie';
import { NextPage } from 'next';

import Loading from 'core/atoms/loading';
import { useStoredOrderQuery } from 'gql/storedOrder';
import CheckoutPageContainer from '../../containers/CheckoutPageContainer';
import { useCarDerivativeQuery } from '../../gql/order';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { useGetQuoteQuery } from '../../gql/storedQuote';

const CheckoutPage: NextPage = () => {
  const { data: orderData } = useStoredOrderQuery();
  const order = orderData?.storedOrder?.order;

  const { data: quoteData } = useGetQuoteQuery();
  const quote = quoteData?.storedQuote;
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
