import React from 'react';

import Icon from 'core/atoms/icon';
import Button from 'core/atoms/button';
import Heading from 'core/atoms/heading';
import Image from 'core/atoms/image/Image';
import HotOffer from 'core/atoms/hot-offer';

import ArrowForwardSharp from 'core/assets/icons/ArrowForwardSharp';

import { ILink } from 'core/interfaces/link';
import RouterLink from 'components/RouterLink';

export interface IProps {
  label: string;
  imageUrl: string;
  link: ILink;
}

function WishlistOfferCard({ label, imageUrl, link }: IProps) {
  return (
    <RouterLink link={link}>
      <div className="card">
        <div className="wishlist-offer">
          <Image src={imageUrl} size="initial-size" plain />
          <div className="details">
            <Heading size="large" color="black">
              {label}
            </Heading>
            <div className="title -flex-h">
              <HotOffer
                className="-b"
                iconSize="large"
                textSize="regular"
                color="orange"
                count={9}
              />
              <Button
                color="teal"
                size="xsmall"
                round
                label={
                  <Icon
                    icon={<ArrowForwardSharp />}
                    className="-regular md hydrated"
                    name="arrow-forward-sharp"
                    color="white"
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </RouterLink>
  );
}

export default WishlistOfferCard;
