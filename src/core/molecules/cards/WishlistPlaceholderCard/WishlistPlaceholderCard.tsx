import React from 'react';

import Button from 'core/atoms/button/Button';

function WishlistPlaceholderCard() {
  return (
    <div className="card">
      <div className="wishlist-placeholder">
        <Button className="button">
          <div className="button--inner">+ Add Vehicle</div>
        </Button>
      </div>
    </div>
  );
}

export default WishlistPlaceholderCard;
