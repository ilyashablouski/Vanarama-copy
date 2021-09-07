import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { SwiperSlide } from 'swiper/react';
import {
  GetInsuranceLandingPage_insuranceLandingPage_sections_carousel as ICarouselData,
  GetInsuranceLandingPage_insuranceLandingPage_sections_carousel_cards as ICard,
} from '../../../../generated/GetInsuranceLandingPage';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={4} />,
});
const CarouselSwiper = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={3} />,
});

const renderCarouselCards = (cards: (ICard | null)[]) =>
  cards.map(card =>
    card?.title && card.body && card.name ? (
      <SwiperSlide key={card.name}>
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          title={{ title: card.title }}
          imageSrc={card.image?.file?.url}
        >
          <ReactMarkdown allowDangerousHtml source={card.body || ''} />
          <RouterLink
            classNames={{ color: 'teal', size: 'regular' }}
            link={{
              label: card.link?.text || '',
              href: card.link?.url || '',
            }}
          />
        </Card>
      </SwiperSlide>
    ) : null,
  );

const InsuranceNewsSection = ({ cards, name }: ICarouselData) => (
  <div className="row:bg-lighter">
    <div className="row:carousel">
      <Heading size="large" color="black">
        {name}
      </Heading>
      {cards && (
        <CarouselSwiper className="-col3" countItems={3}>
          {renderCarouselCards(cards.slice(0, 9))}
        </CarouselSwiper>
      )}
    </div>
  </div>
);

export default React.memo(InsuranceNewsSection);
