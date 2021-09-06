import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import { SwiperSlide } from 'swiper/react';
import {
  GenericPageQuery_genericPage_sections_carousel as GenericPageCarousel,
  GenericPageQuery_genericPage_sections_carousel_cards as ICaruselCard,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';

const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={1} />,
});

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const CarouselSwiper = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={1} />,
});

const renderCarouselCards = (cards: (ICaruselCard | null)[]) =>
  cards.map(card =>
    card?.title && card.body && card.name ? (
      <SwiperSlide key={card.name}>
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          title={{ title: card?.title }}
          imageSrc={card.image?.file?.url}
        >
          <Text size="regular" color="dark">
            {card.body || ''}
          </Text>
          <RouterLink
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            className="button"
            link={{
              href: card.link?.legacyUrl || card.link?.url || '',
              label: card?.link?.text || '',
            }}
          >
            <div className="button--inner">{card.link?.text}</div>
          </RouterLink>
        </Card>
      </SwiperSlide>
    ) : null,
  );

interface ICarousel {
  carousel: GenericPageCarousel;
}

const LeasingQuestionsCarousel: FC<ICarousel> = ({ carousel }) => {
  const isLargeScreen = useMediaQuery({ minWidth: 1216 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1215 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  if (!carousel?.cards) {
    return <></>;
  }

  return (
    <>
      {(!isLargeScreen && carousel?.cards.length >= 3 && (
        <CarouselSwiper className="-col3" countItems={3}>
          {renderCarouselCards(carousel?.cards)}
        </CarouselSwiper>
      )) ||
        (isLargeScreen && carousel?.cards.length > 3 && (
          <CarouselSwiper className="-col3" countItems={3}>
            {renderCarouselCards(carousel?.cards)}
          </CarouselSwiper>
        )) ||
        (isLargeScreen && carousel?.cards.length <= 3 && (
          <div className="row:cards-3col">
            {renderCarouselCards(carousel?.cards)}
          </div>
        )) ||
        (isMediumScreen && carousel?.cards.length <= 2 && (
          <div className="row:cards-2col">
            {renderCarouselCards(carousel?.cards)}
          </div>
        )) ||
        (isSmallScreen &&
          carousel?.cards.length === 1 &&
          renderCarouselCards(carousel?.cards))}
    </>
  );
};

export default LeasingQuestionsCarousel;
