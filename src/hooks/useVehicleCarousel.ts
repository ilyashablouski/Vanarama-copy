import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Cookies from 'js-cookie';
import { vehicleCarouselForBlogPageRequest } from '../utils/offers';
import { ProductDerivativeFilter } from '../../generated/globalTypes';
import { isBlogCarPagesCarouselFeatureFlagEnabled } from '../utils/helpers';
import { IBlogCarouselCard } from '../components/BlogCarousel/interface';

export default function useVehicleCarousel(
  productFilter: ProductDerivativeFilter,
) {
  const client = useApolloClient();

  const [vehiclesList, setVehiclesList] = useState<IBlogCarouselCard[]>([]);

  useEffect(() => {
    if (isBlogCarPagesCarouselFeatureFlagEnabled(Cookies)) {
      const getDataForCarousel = async () => {
        const vehicleCarouselList = await vehicleCarouselForBlogPageRequest(
          client,
          productFilter,
        );
        setVehiclesList(vehicleCarouselList || []);
      };
      getDataForCarousel();
    }
  }, [client]);

  return vehiclesList;
}
