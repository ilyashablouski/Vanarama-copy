import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { GET_PRODUCT_CARDS_DATA } from './gql';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import Skeleton from '../../components/Skeleton';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../generated/GetProductCard';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface ICustomerAlsoViewedContainerProps {
  capsId: string[];
  leaseType: string;
  vehicleType?: VehicleTypeEnum;
  initProductCard?: any;
}

const CustomerAlsoViewedContainer: React.FC<ICustomerAlsoViewedContainerProps> = ({
  capsId,
  leaseType,
  vehicleType,
  initProductCard,
}) => {
  const [productCardData, setProductCardData] = useState(initProductCard);

  const [getProductCard] = useLazyQuery<
    GetProductCard,
    GetProductCardVariables
  >(GET_PRODUCT_CARDS_DATA, {
    variables: {
      capIds: capsId,
      vehicleType,
    },
    onCompleted: result => setProductCardData({ data: { ...result } }),
  });

  useEffect(() => {
    getProductCard();
  }, [getProductCard, vehicleType]);

  if (!productCardData?.data) {
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
            data={productCardData.data}
            dataTestIdBtn="customer-also-view"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerAlsoViewedContainer;
