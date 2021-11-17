import React, { useMemo } from 'react';

import Icon from 'core/atoms/icon';
import Button from 'core/atoms/button/Button';

import Heart from 'core/assets/icons/Heart';
import HeartOutline from 'core/assets/icons/HeartOutline';

import { Nullish } from '../../types/common';
import { GetVehicleDetails } from '../../../generated/GetVehicleDetails';
import { convertProductDetailsToWishlistProduct } from './helpers';
import { isWished } from '../../utils/wishlistHelpers';
import useWishlist from '../../hooks/useWishlist';

interface IProps {
  productDetails: Nullish<GetVehicleDetails>;
}

function WishlistToggle({ productDetails }: IProps) {
  const { wishlistVehicleIds, wishlistChange } = useWishlist();

  const productData = useMemo(
    () => convertProductDetailsToWishlistProduct(productDetails),
    [productDetails],
  );

  const wished = isWished(wishlistVehicleIds, productData);

  function handleClick() {
    wishlistChange(productData);
  }

  return (
    <Button
      fill="clear"
      color="teal"
      size="xsmall"
      iconPosition="before"
      label={
        <>
          <Icon icon={wished ? <Heart /> : <HeartOutline />} color="teal" />
          {wished ? 'Remove' : 'Wishlist'}
        </>
      }
      withoutDefaultClass
      onClick={handleClick}
      dataUiTestId={`details-page_button_${wished ? 'Remove' : 'Wishlist'}`}
    />
  );
}

export default WishlistToggle;
