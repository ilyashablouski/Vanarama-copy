import React from 'react';

import Heading from 'core/atoms/heading';
import Image from 'core/atoms/image/Image';
import HotOffer from 'core/atoms/hot-offer';

import RouterLink from 'components/RouterLink';

export interface IProps {
  label: string;
}

function WishlistCard({ label }: IProps) {
  return (
    <RouterLink className="card" link={{ href: '', label: '' }}>
      <div className="wishlist-offer">
        <Image size="large" src="/wishlist-image.png" />
        <div className="details">
          <Heading size="large" color="black">
            {label}
          </Heading>
          <HotOffer
            className="-b"
            iconSize="large"
            textSize="regular"
            color="orange"
            count={9}
          />
        </div>
      </div>
    </RouterLink>
  );
}

export default WishlistCard;
