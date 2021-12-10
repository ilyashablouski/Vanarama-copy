import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Cookies from 'js-cookie';
import { vehicleCarouselForBlogPageRequest } from '../utils/offers';
import { isBlogCarPagesCarouselFeatureFlagEnabled } from '../utils/helpers';
import { IBlogCarouselCard } from '../components/BlogCarousel/interface';
import { productFilterMapper } from '../components/BlogCarousel/helpers';
import { useBlogPostCarouselData } from '../gql/blogPost';

export default function useVehicleCarousel(articleUrl?: string) {
  const client = useApolloClient();

  const [vehiclesList, setVehiclesList] = useState<IBlogCarouselCard[]>([]);
  const [
    blogPostCarouselData,
    { data: carouselData },
  ] = useBlogPostCarouselData();

  useEffect(() => {
    if (
      isBlogCarPagesCarouselFeatureFlagEnabled(Cookies) &&
      articleUrl &&
      !carouselData
    ) {
      blogPostCarouselData({
        variables: {
          slug: articleUrl,
        },
      });
    }

    if (carouselData) {
      const getDataForCarousel = async () => {
        const vehicleCarouselList = await vehicleCarouselForBlogPageRequest(
          client,
          productFilterMapper(carouselData?.blogPost.productFilter),
        );
        setVehiclesList(vehicleCarouselList || []);
      };
      getDataForCarousel();
    }
  }, [articleUrl, blogPostCarouselData, carouselData, client]);

  return { carouselData, vehiclesList };
}
