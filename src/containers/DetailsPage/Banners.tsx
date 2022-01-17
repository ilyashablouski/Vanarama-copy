import React from 'react';
import dynamic from 'next/dynamic';

import ImageV2 from 'core/atoms/image/ImageV2';

import { GetPdpContent_pdpContent_banners } from '../../../generated/GetPdpContent';

import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  cards: GetPdpContent_pdpContent_banners[];
}

const Banners = ({ cards }: IProps) => {
  return cards.length > 1 ? (
    <div className="two-col">
      {cards.map(card => (
        <div key={card?.title} className="option-icon-left -white">
          <ImageV2
            sizes="30vw"
            quality={70}
            width={card.image?.file?.details.image.width}
            height={card.image?.file?.details.image.height}
            src={card.image?.file?.url || ''}
            size="regular"
            plain
          />
          <div className="copy">
            <Text tag="p">
              <span>{card.title}</span>
            </Text>
            <span className="-mt-100">{card.description}</span>
            <RouterLink
              link={{
                href: card.link?.url || '',
                label: card.link?.text || '',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="banner">
      <ImageV2
        sizes="30vw"
        quality={70}
        width={cards[0]?.image?.file?.details.image.width}
        height={cards[0]?.image?.file?.details.image.height}
        src={cards[0]?.image?.file?.url || ''}
        size="regular"
        plain
      />
      <div>
        <Heading color="black" size="regular">
          <span>{cards[0]?.title}</span>
        </Heading>
        <Text className="-pr-100" color="black" size="regular">
          {cards[0]?.description}
        </Text>
        <RouterLink
          link={{
            href: cards[0]?.link?.url || '',
            label: cards[0]?.link?.text || '',
          }}
          classNames={{
            color: 'teal',
          }}
        />
      </div>
    </div>
  );
};

export default Banners;
