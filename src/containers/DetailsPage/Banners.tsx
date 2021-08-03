import React from 'react';

import Image from 'core/atoms/image/Image';
import RouterLink from '../../components/RouterLink';
import { GetPdpContent_pdpContent_banners } from '../../../generated/GetPdpContent';

interface IProps {
  cards: GetPdpContent_pdpContent_banners[];
}

const Banners = ({ cards }: IProps) => {
  return cards.length ? (
    <div className={cards.length === 1 ? 'banner' : 'two-col'}>
      {cards.map(card => (
        <div className="option-icon-left -white">
          <Image src={card?.image?.file?.url || ''} plain />
          <div className="copy">
            <p>{card.title}</p>

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
  ) : null;
};

export default Banners;
