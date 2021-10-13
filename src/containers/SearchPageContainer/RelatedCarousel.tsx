import React, { useMemo } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import RouterLink from '../../components/RouterLink';

import { GenericPageQuery_genericPage_sections_carousel_cards as ICarouselCard } from '../../../generated/GenericPageQuery';
import Skeleton from '../../components/Skeleton';
import SearchPageMarkdown from './SearchPageMarkdown';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={2} />,
});

const CarouselSwiper = dynamic(
  () => import('core/organisms/carousel/CarouselSwiper'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={10} />,
});

interface IProps {
  cards: (ICarouselCard | null)[] | null;
  title: Nullable<string>;
}

const renderCarouselSlide = (card: ICarouselCard) => (
  <SwiperSlide key={card.name}>
    <Card
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      className="card__article"
      imageSrc={
        card?.image?.file?.url ||
        `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
      }
      title={{
        title: card.link?.legacyUrl || card.link?.url ? '' : card.title || '',
        link: (
          <RouterLink
            link={{
              href: card.link?.legacyUrl || card.link?.url || '',
              label: card.title || '',
            }}
            className="card--link"
            classNames={{
              color: 'black',
              size: 'regular',
            }}
          />
        ),
      }}
    >
      <SearchPageMarkdown markdown={card.body} withoutImage />
      <RouterLink
        link={{
          href: card.link?.legacyUrl || card.link?.url || '',
          label: card.link?.text || '',
        }}
        classNames={{ color: 'teal' }}
      />
    </Card>
  </SwiperSlide>
);

const RelatedCarousel = ({ cards, title }: IProps) => {
  const resultCards = useMemo(
    () => cards?.filter(item => !!item) as ICarouselCard[],
    [cards],
  );

  return (
    <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
      <div className="row:bg-lighter">
        <div className="row:carousel">
          {title && (
            <Heading size="large" color="black" tag="h3">
              {title}
            </Heading>
          )}
          <CarouselSwiper countItems={resultCards.length} className="-col3">
            {resultCards.map(renderCarouselSlide)}
          </CarouselSwiper>
        </div>
      </div>
    </LazyLoadComponent>
  );
};

export default RelatedCarousel;
