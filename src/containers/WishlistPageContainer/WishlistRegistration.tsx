import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';

import RouterLink from 'components/RouterLink';
import { IWishlistRegistration } from './interface';

function WishlistRegistration({ className }: IWishlistRegistration) {
  return (
    <div className={cx('row', className)}>
      <Text className="-semi-b -mb-400" tag="p" size="lead" color="black">
        Your wishlist will be saved for 30 days in this browser. To access it
        from anywhere, create your account now. Please note, vehicles prices are
        subject to change.
      </Text>
      <RouterLink
        withoutDefaultClassName
        className="button -w-200 -a-center"
        classNames={{ color: 'teal', solid: true, size: 'regular' }}
        link={{
          label: 'Register Now',
          href: '/account/login-register',
        }}
      >
        <div className="button--inner">Register Now</div>
      </RouterLink>
    </div>
  );
}

export default WishlistRegistration;
