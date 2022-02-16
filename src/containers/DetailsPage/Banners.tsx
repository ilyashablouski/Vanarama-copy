import React from 'react';
import dynamic from 'next/dynamic';

import ImageV2 from 'core/atoms/image/ImageV2';

import { GetPdpContent_pdpContent_banners } from '../../../generated/GetPdpContent';

import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';
import { isBannerAvailable } from './helpers';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  cards: GetPdpContent_pdpContent_banners[];
}

function getBanner(card: GetPdpContent_pdpContent_banners): JSX.Element {
  return (
    <div className="banner">
      <ImageV2
        sizes="30vw"
        quality={60}
        width={card.image?.file?.details.image.width}
        height={card.image?.file?.details.image.height}
        src={card.image?.file?.url || ''}
        size="regular"
        plain
      />
      <div className="-pr-600">
        <Heading color="black" size="regular">
          <span>{card.title}</span>
        </Heading>
        <Text className="-pr-100" color="black" size="regular">
          {card.description}{' '}
          <RouterLink
            link={{
              href: card.link?.url || '',
              label: card.link?.text || '',
            }}
            classNames={{
              color: 'teal',
            }}
          />
        </Text>
      </div>
    </div>
  );
}

const Banners = ({ cards }: IProps) => {
  const isFirstBannerAvailable = isBannerAvailable(cards[0]);
  const isSecondBannerAvailable = isBannerAvailable(cards[1]);

  if (isFirstBannerAvailable && isSecondBannerAvailable) {
    return (
      <div className="two-col">
        {cards.map(card => (
          <div key={card.title} className="option-icon-left -white">
            <ImageV2
              sizes="30vw"
              quality={60}
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
    );
  }

  if (isFirstBannerAvailable) {
    return getBanner(cards[0]);
  }

  if (isSecondBannerAvailable) {
    return getBanner(cards[1]);
  }

  return null;
};

export default Banners;
