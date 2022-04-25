import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as CardData,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import getTitleTag from '../../utils/getTitleTag';
import Skeleton from '../../components/Skeleton';

const CheckmarkCircleSharp = dynamic(
  () => import('core/assets/icons/CheckmarkCircleSharp'),
  {
    ssr: false,
  },
);
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={4} />,
  ssr: false,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});

interface IProps {
  sections: Section | null | undefined;
}

const ThankYouContainer: FC<IProps> = ({ sections }) => {
  const cards = getSectionsData(['carousel', 'cards'], sections);
  const leadText = sections?.leadText;

  return (
    <>
      <div className="row:title" />
      <div className="row:lead-text">
        <Heading
          tag={getTitleTag(leadText?.titleTag || 'h1') as any}
          size="xlarge"
          color="black"
        >
          <Icon
            className="-pr-300"
            color="success"
            icon={<CheckmarkCircleSharp />}
          />
          {leadText?.heading}
        </Heading>
        <Text size="lead" color="darker">
          {leadText?.description}
        </Text>
      </div>
      <div className="row:bg-lighter">
        <div className="row:cards-3col">
          <Heading size="large" color="black">
            {sections?.carousel?.title}
          </Heading>
          {cards?.map((card: CardData, index: number) => (
            <Card
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={card.title || index}
              title={{
                title: '',
                withBtn: true,
                link: (
                  <Heading tag={getTitleTag(card.titleTag || 'span') as any}>
                    <RouterLink
                      link={{
                        href: card.link?.legacyUrl || card.link?.url || '#',
                        label: card.link?.text || '',
                      }}
                      className="heading"
                      classNames={{ size: 'lead', color: 'black' }}
                    >
                      {card.title}
                    </RouterLink>
                  </Heading>
                ),
              }}
              imageSrc={card.image?.file?.url || ''}
              description={card.body || ''}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ThankYouContainer;
