import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';

import { IWishlistEmptyMessage } from './interface';

function WishlistEmptyMessage({ className }: IWishlistEmptyMessage) {
  return (
    <section className={cx('row:cards-1col', className)}>
      <div className="card -message -flex-h">
        <div className="row:lead-text -m-300">
          <Text className="-m" size="lead" color="darker">
            Your wishlist is empty right now.
          </Text>
          <Heading size="lead" color="darker">
            Want to add vehicles to your wishlist? View the latest hot offers
            below.
          </Heading>
        </div>
      </div>
    </section>
  );
}

export default WishlistEmptyMessage;
