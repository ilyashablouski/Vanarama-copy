import { useEffect, useMemo, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { UnionToIntersection } from 'core/interfaces/unionToIntersection';
import { vehicleCarouselRequest } from '../utils/offers';
import { ICarouselCard } from '../components/BlogCarousel/interface';
import { productFilterMapper } from '../components/BlogCarousel/helpers';
import { useBlogPostCarouselData } from '../gql/blogPost';
import { useGenericPageCarouselData } from '../gql/genericPage';

type ICarouselTypeKeys = keyof typeof carouselTypeMap;
type ICarouselResultKeys = typeof carouselTypeMap[ICarouselTypeKeys]['key'];
type ICarouselResponseTypes = UnionToIntersection<
  NonNullable<
    ReturnType<typeof carouselTypeMap[ICarouselTypeKeys]['query']>['1']['data']
  >
>[ICarouselResultKeys];
type ICarouselData = Record<ICarouselResultKeys, ICarouselResponseTypes>;

const carouselTypeMap = {
  blog: {
    key: 'blogPost',
    query: useBlogPostCarouselData,
  },
  guides: {
    key: 'genericPage',
    query: useGenericPageCarouselData,
  },
  reviews: {
    key: 'genericPage',
    query: useGenericPageCarouselData,
  },
} as const;

export default function useVehicleCarousel(
  type: ICarouselTypeKeys,
  articleUrl?: string,
) {
  const client = useApolloClient();
  const { query, key } = carouselTypeMap[type];

  const [vehiclesList, setVehiclesList] = useState<ICarouselCard[]>([]);
  const [carouselData, response] = query();
  const { productFilter, carouselPosition } =
    ((response.data as unknown) as ICarouselData)?.[key] ?? {};
  const title = useMemo(() => productFilter?.title || '', [productFilter]);

  useEffect(() => {
    if (articleUrl && !carouselPosition) {
      carouselData({
        variables: {
          slug: articleUrl,
        },
      });
    }

    if (carouselPosition) {
      (async () => {
        const vehicleCarouselList = await vehicleCarouselRequest(
          client,
          productFilterMapper(productFilter),
        );

        setVehiclesList(vehicleCarouselList || []);
      })();
    }
  }, [articleUrl, carouselData, productFilter, client, key, carouselPosition]);

  return { carouselPosition, vehiclesList, title };
}
