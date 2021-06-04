import React from 'react';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';
import Image from 'core/atoms/image/Image';
import Flame from 'core/assets/icons/Flame';

import { IWishlistHotOffers } from './interface';
import RouterLink from '../../components/RouterLink';

function WishlistHotOffer({ label }: IWishlistHotOffers) {
  return (
    <RouterLink className="card" link={{ href: '', label: '' }}>
      <Image src="" />
      <Heading size="large" color="black">
        {label}
      </Heading>
      <Text size="regular" color="orange">
        <Icon icon={<Flame />} size="xsmall" color="orange" />9 Hot Offer
      </Text>
    </RouterLink>
  );
}

export default WishlistHotOffer;
