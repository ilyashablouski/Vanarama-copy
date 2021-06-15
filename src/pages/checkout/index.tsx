import { NextPage } from 'next';
import React from 'react';

import Loading from 'core/atoms/loading';

import CheckoutPageContainer from '../../containers/CheckoutPageContainer';
import useGetOrder from '../../hooks/useGetOrder';
import { useCarDerivativeQuery } from '../../gql/order';

const CheckoutPage: NextPage = () => {
  const order = useGetOrder();
  const vehicleProduct = order?.lineItems?.[0]?.vehicleProduct;

  const { data, loading, error } = useCarDerivativeQuery(
    vehicleProduct?.derivativeCapId,
    vehicleProduct?.vehicleType,
    !order,
  );

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
