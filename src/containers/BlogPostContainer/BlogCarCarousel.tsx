import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';
import { Nullable } from '../../types/common';
import { ProductCardData } from '../../../generated/ProductCardData';
import { GetDerivatives } from '../../../generated/GetDerivatives';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../../generated/VehicleListUrl';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  productsCar?: Nullable<ProductCardData>;
  productsCarDerivatives?: Nullable<GetDerivatives>;
  vehicleListUrlData?: IVehicleList;
}

const BlogCarsCarousel: NextPage<IProps> = ({
  productsCar,
  productsCarDerivatives,
  vehicleListUrlData,
}) => {
  if (!productsCar || !productsCarDerivatives || !vehicleListUrlData) {
    return null;
  }

  return (
    <>
      <div>
        <Heading size="large" color="black">
          <span
            style={{ textAlign: 'center', display: 'block' }}
            className="-mb-400"
          >
            Car Lease Hot Offers
          </span>
        </Heading>
        <ProductCarousel
          leaseType={LeaseTypeEnum.PERSONAL}
          data={{
            derivatives: productsCarDerivatives?.derivatives || null,
            productCard: productsCar?.productCarousel || null,
            vehicleList: vehicleListUrlData,
          }}
          countItems={productsCar?.productCarousel?.length || 6}
          dataTestIdBtn="car-view-offer"
        />
      </div>
      <div className="-justify-content-row -pt-500">
        <RouterLink
          className="button"
          classNames={{ color: 'teal', solid: true, size: 'regular' }}
          link={{
            label: 'View All Car Offers',
            href: '/car-leasing-special-offers.html',
          }}
          withoutDefaultClassName
        >
          <div className="button--inner">View All Car Offers</div>
        </RouterLink>
      </div>
    </>
  );
};

export default BlogCarsCarousel;
