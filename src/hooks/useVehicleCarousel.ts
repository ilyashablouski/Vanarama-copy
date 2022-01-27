import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { vehicleCarouselRequest } from '../utils/offers';
import { ICarouselCard } from '../components/BlogCarousel/interface';
import { productFilterMapper } from '../components/BlogCarousel/helpers';
import { useBlogPostCarouselData } from '../gql/blogPost';
import { useGenericPageCarouselData } from '../gql/genericPage';
import { UnionToIntersection } from '../core/interfaces/unionToIntersection';

type CarouselTypeKeys = keyof typeof carouselType;
type CarouselResultKeys = typeof carouselType[CarouselTypeKeys]['key'];
type CarouselResponseTypes = UnionToIntersection<
  NonNullable<
    ReturnType<typeof carouselType[CarouselTypeKeys]['query']>['1']['data']
  >
>[CarouselResultKeys];
type CarouselType = Record<CarouselResultKeys, CarouselResponseTypes>;

const carouselType = {
  blog: {
    key: 'blogPost',
    query: useBlogPostCarouselData,
  },
  guides: {
    key: 'genericPage',
    query: useGenericPageCarouselData,
  },
} as const;

export default function useVehicleCarousel(
  type: CarouselTypeKeys,
  articleUrl?: string,
) {
  const client = useApolloClient();
  const { query, key } = carouselType[type];

  const [vehiclesList, setVehiclesList] = useState<ICarouselCard[]>([]);
  const [carouselData, response] = query();
  const { productFilter, carouselPosition } =
    ((response.data as unknown) as CarouselType)?.[key] ?? {};

  useEffect(() => {
    if (articleUrl && !productFilter) {
      carouselData({
        variables: {
          slug: articleUrl,
        },
      });
    }

    if (!productFilter) {
      (async () => {
        const vehicleCarouselList = await vehicleCarouselRequest(
          client,
          productFilterMapper(productFilter),
        );

        setVehiclesList(vehicleCarouselList || []);
      })();
    }
  }, [articleUrl, carouselData, productFilter, client, key]);

  return { carouselPosition, vehiclesList };
}
