import React, { useState, FC } from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import DOMPurify from 'dompurify';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import { GenericPageQuestionQuery_genericPage_sections_cards_cards as ICaruselCard } from '../../../generated/GenericPageQuestionQuery';

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
