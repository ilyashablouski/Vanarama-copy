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
import { Nullable } from '../../types/common';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface ICustomerAlsoViewedContainerProps {
  capsId: string[];
  leaseType: string;
  vehicleType?: VehicleTypeEnum;
  initProductCard?: Nullable<GetProductCard>;
  lazyLoadForCarouselImages?: boolean;
}

const CustomerAlsoViewedContainer: React.FC<ICustomerAlsoViewedContainerProps> = ({
  capsId,
  leaseType,
  vehicleType,
  initProductCard,
  lazyLoadForCarouselImages,
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
    onCompleted: result =>
      setProductCardData({
        ...result,
      }),
  });

  useEffect(() => {
    getProductCard();
  }, [getProductCard, vehicleType]);

  if (!productCardData) {
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
            data={productCardData}
            dataTestIdBtn="customer-also-view"
            lazyLoadForCarouselImages={lazyLoadForCarouselImages}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerAlsoViewedContainer;
