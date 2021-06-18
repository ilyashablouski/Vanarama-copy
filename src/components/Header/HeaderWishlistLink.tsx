import React from 'react';

import Icon from 'core/atoms/icon';
import Heart from 'core/assets/icons/Heart';

import useWishlist from '../../hooks/useWishlist';

import RouterLink from '../RouterLink';

function HeaderWishlistLink() {
  const { wishlistVehicleIds } = useWishlist();

  return (
    <RouterLink
      className="header-wishlist"
      link={{ href: '/wishlist', label: '' }}
    >
      <Icon icon={<Heart />} size="large" />
      {wishlistVehicleIds.length > 0 && (
        <span className="badge">{wishlistVehicleIds.length}</span>
      )}
    </RouterLink>
  );
}

export default HeaderWishlistLink;
