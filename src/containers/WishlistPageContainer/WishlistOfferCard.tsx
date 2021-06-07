import React from 'react';

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
  onClick,
}: IWishlistOffer) {
  return (
    <ProductCard imageSrc={imageUrl} className="-vehicle-type">
      <div className="copy">
        <Heading tag="span" size="large" color="black">
          {label}
        </Heading>
        <div className="title -flex">
          <HotOffer
            className="-b"
            iconSize="large"
            textSize="regular"
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
