import React from 'react';

import Image from 'core/atoms/image/Image';
import dynamic from 'next/dynamic';
import RouterLink from '../../components/RouterLink';
import { GetPdpContent_pdpContent_banners } from '../../../generated/GetPdpContent';
import Skeleton from '../../components/Skeleton';

const Icon = dynamic(() => import('core/atoms/icon/'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
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
  return cards.length && cards.length > 1 ? (
    <div className="two-col">
      {cards.map(card => (
        <div className="option-icon-left -white">
          <Image src={card?.image?.file?.url || ''} plain />
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
      <Icon
        className="-inherit md hydrated"
        icon={<Image src={cards[0]?.image?.file?.url || ''} plain />}
      />
      <div>
        <Heading color="black" size="regular">
          <span>{cards[0].title}</span>
        </Heading>
        <Text className="-pr-100" color="black" size="regular">
          {cards[0]?.description}
        </Text>
        <RouterLink
          link={{
            href: cards[0].link?.url || '',
            label: cards[0].link?.text || '',
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
