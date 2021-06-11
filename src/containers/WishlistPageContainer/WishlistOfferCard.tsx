import React from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Button from 'core/atoms/button';
import Heading from 'core/atoms/heading';
import HotOffer from 'core/atoms/hot-offer';

import ProductCard from 'core/molecules/cards/ProductCard';

import ArrowForwardSharp from 'core/assets/icons/ArrowForwardSharp';

import { IWishlistOffer } from './interface';

function WishlistOfferCard({
  label,
  imageUrl,
  totalCount,
  textSize,
  iconSize,
  className,
  onClick,
}: IWishlistOffer) {
  return (
    <ProductCard className={cx('-vehicle-type', className)} imageSrc={imageUrl}>
      <div className="copy">
        <Heading tag="span" size="large" color="black">
          {label}
        </Heading>
        <div className="title -flex">
          <HotOffer
            className="-b"
            iconSize={iconSize}
            textSize={textSize}
            totalCount={totalCount}
            color="orange"
          />
          <Button
            round
            color="teal"
            size="xsmall"
            onClick={onClick}
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
    </ProductCard>
  );
}

export default WishlistOfferCard;
