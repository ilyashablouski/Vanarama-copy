import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';

import RouterLink from 'components/RouterLink';
import { IWishlistRegistration } from './interface';

function WishlistRegistrationMessage({ className }: IWishlistRegistration) {
  return (
    <div className={cx('row', className)}>
      <Text className="-m" tag="p" size="lead" color="black">
        Log in to your account to access your saved vehicles from any device and
        if the price drops or delivery times change, we can let you know.
      </Text>
      <Text className="-m" tag="p" size="lead" color="black">
        Don’t have an account? Register today.
      </Text>
      <RouterLink
        withoutDefaultClassName
        className="button -w-200 -mt-400 -a-center"
        classNames={{ color: 'teal', solid: true, size: 'regular' }}
        link={{
          label: 'Register Now',
          href: '/account/login-register',
        }}
      >
        <div className="button--inner">Register / Login</div>
      </RouterLink>
    </div>
  );
}

export default WishlistRegistrationMessage;
