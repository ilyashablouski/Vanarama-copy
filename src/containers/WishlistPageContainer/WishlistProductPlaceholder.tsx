import React from 'react';

import Button from 'core/atoms/button';
import Card from 'core/molecules/cards';

import { IWishlistProductPlaceholder } from './interface';

function WishlistProductPlaceholder({ onClick }: IWishlistProductPlaceholder) {
  return (
    <Card className="-skeleton">
      <div className="card-image">
        <Button
          color="teal"
          size="regular"
          fill="solid"
          onClick={onClick}
          label="+ Add Vehicle"
        />
      </div>
    </Card>
  );
}

export default WishlistProductPlaceholder;
