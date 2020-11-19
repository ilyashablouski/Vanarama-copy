import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';

import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import {
  GetInsuranceLandingPage_insuranceLandingPage_sections_carousel as ICarouselData,
  GetInsuranceLandingPage_insuranceLandingPage_sections_carousel_cards as ICard,
} from '../../../../generated/GetInsuranceLandingPage';
import RouterLink from '../../../components/RouterLink/RouterLink';

const renderCarouselCards = (cards: (ICard | null)[]) =>
  cards.map(card =>
    card?.title && card.body && card.name ? (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={card.name}
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
    ) : null,
  );

const InsuranceNewsSection = ({ cards, name }: ICarouselData) => {
  return (
    <div className="row:bg-lighter">
      <div className="row:carousel">
        <Heading size="large" color="black">
          {name}
        </Heading>
        {cards && (
          <Carousel className="-col3" countItems={3}>
            {renderCarouselCards(cards.slice(0, 9))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default InsuranceNewsSection;
