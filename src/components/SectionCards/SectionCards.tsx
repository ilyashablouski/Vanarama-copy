import React from 'react';
import dynamic from 'next/dynamic';
import { GenericPageQuery_genericPage_sections_cards_cards as ICards } from '../../../generated/GenericPageQuery';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  cards: (ICards | null)[];
}
const SectionCards = ({ cards }: IProps) => (
  <>
    {cards?.map(card =>
      card?.title && card.name ? (
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          key={card.name || undefined}
          imageSrc={card.image?.file?.url}
          title={{
            className: '-flex-h',
            link: (
              <RouterLink
                withoutDefaultClassName
                className="heading"
                classNames={{ color: 'black', size: 'lead' }}
                link={{
                  href: card.link?.legacyUrl || card.link?.url || '',
                  label: card.title || '',
                }}
              >
                {card.title}
              </RouterLink>
            ),
            title: '',
            withBtn: true,
          }}
          description={card.body || ''}
        />
      ) : null,
    )}
  </>
);

export default SectionCards;
