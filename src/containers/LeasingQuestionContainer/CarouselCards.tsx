import React, { useState, FC } from 'react';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import { GenericPageQuestionQuery_genericPage_sections_cards_cards as ICaruselCard } from '../../../generated/GenericPageQuestionQuery';
import Skeleton from '../../components/Skeleton';

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Carousel = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/carousel'),
  {
    loading: () => <Skeleton count={4} />,
    ssr: false,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

interface ICarouselCards {
  cards: ICaruselCard[];
}

const renderCarouselCards = (cards: (ICaruselCard | null)[]) =>
  cards.map(card => {
    const [readMore, toggleRead] = useState(true);
    const clearHtml = DOMPurify.sanitize(card && card.body ? card.body : '');
    const cardText = {
      dangerouslySetInnerHTML: {
        __html: readMore ? `${clearHtml.slice(0, 120)}...` : clearHtml,
      },
    };

    return card?.title && card.body && card.name ? (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={card.name}
        title={{ title: card?.title }}
        imageSrc={card.image?.file?.url}
      >
        <Text size="regular" color="dark">
          <span {...cardText} />
        </Text>
        <Button
          fill="clear"
          color="teal"
          size="regular"
          label={readMore ? 'Read More' : 'Read Less'}
          onClick={() => toggleRead(!readMore)}
        />
      </Card>
    ) : null;
  });

const CarouselCards: FC<ICarouselCards> = ({ cards }) => (
  <Carousel className="-col3" countItems={3}>
    {renderCarouselCards(cards)}
  </Carousel>
);

export default CarouselCards;
