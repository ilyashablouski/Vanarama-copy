/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { NextRouter } from 'next/router';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { useProductCardData } from './gql';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';

interface ICustomerAlsoViewedContainerProps {
  capsId: string[];
  leaseType: string;
  router: NextRouter;
  vehicleType?: VehicleTypeEnum;
}

const CustomerAlsoViewedContainer: React.FC<ICustomerAlsoViewedContainerProps> = ({
  capsId,
  leaseType,
  vehicleType,
  router,
}) => {
  const { data, loading, error } = useProductCardData(capsId, vehicleType);

  if (!capsId.length) {
    return null;
  }

  if (loading) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '10rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message}
      </div>
    );
  }

  if (!data?.productCard?.length) {
    return null;
  }

  return (
    <div className="row:bg-lighter ">
      <div className="row:carousel">
        <Heading tag="h3" color="black" size="large">
          Customers Also Viewed
        </Heading>
        <div style={{ width: '100%' }}>
          <ProductCarousel leaseType={leaseType} router={router} data={data} />
        </div>
      </div>
    </div>
  );
};

export default CustomerAlsoViewedContainer;
