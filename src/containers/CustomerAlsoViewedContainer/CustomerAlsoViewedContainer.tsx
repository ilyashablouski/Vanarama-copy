/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import dynamic from 'next/dynamic';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { useProductCardDataQuery } from './gql';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface ICustomerAlsoViewedContainerProps {
  capsId: string[];
  leaseType: string;
  vehicleType?: VehicleTypeEnum;
}

const CustomerAlsoViewedContainer: React.FC<ICustomerAlsoViewedContainerProps> = ({
  capsId,
  leaseType,
  vehicleType,
}) => {
  const { data, loading, error } = useProductCardDataQuery(
    capsId,
    vehicleType,
    !capsId.length,
  );
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
        <div className="full-width">
          <ProductCarousel
            leaseType={leaseType}
            data={data}
            dataTestIdBtn="customer-also-view"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerAlsoViewedContainer;
