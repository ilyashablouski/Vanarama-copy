import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Cookies from 'js-cookie';
import { Nullish } from '../types/common';
import { ProductCardData } from '../../generated/ProductCardData';
import { GetDerivatives } from '../../generated/GetDerivatives';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../generated/VehicleListUrl';
import { specialOffersForBlogPageRequest } from '../utils/offers';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { isBlogCarPagesCarouselFeatureFlagEnabled } from '../utils/helpers';

export default function useVehicleCarousel(vehicleType: VehicleTypeEnum) {
  const client = useApolloClient();

  const [productsCarData, setProductsCarData] = useState<
    Nullish<ProductCardData>
  >(null);
  const [productsCarDerivativesData, setProductsCarDerivativesData] = useState<
    Nullish<GetDerivatives>
  >(null);
  const [vehicleListUrlState, setVehicleListUrlState] = useState<
    Nullish<IVehicleList>
  >(null);

  useEffect(() => {
    if (isBlogCarPagesCarouselFeatureFlagEnabled(Cookies)) {
      const getDataForCarousel = async () => {
        const {
          productsCar,
          productsCarDerivatives,
          vehicleListUrlData,
        } = await specialOffersForBlogPageRequest(client, vehicleType);
        setProductsCarData(productsCar);
        setProductsCarDerivativesData(productsCarDerivatives);
        setVehicleListUrlState(vehicleListUrlData);
      };
      getDataForCarousel();
    }
  }, [client, vehicleType]);

  return {
    productsCarData,
    productsCarDerivativesData,
    vehicleListUrlState,
  };
}
