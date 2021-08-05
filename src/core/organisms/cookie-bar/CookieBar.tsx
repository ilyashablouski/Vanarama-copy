import React, { TransitionEvent, useEffect, useState } from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';

import CloseSharp from '../../assets/icons/CloseSharp';
import RouterLink from '../../../components/RouterLink';

function CookieBar() {
  const [isActive, setActive] = useState(true);
  const [isVisible, setVisible] = useState(false);

  function hideCookieBar() {
    setVisible(!isVisible);
  }

  function handleTransitionEnd({
    target,
    currentTarget,
  }: TransitionEvent<HTMLDivElement>) {
    if (target === currentTarget && !isVisible) {
      setActive(false);
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return isActive ? (
    <div
      role="dialog"
      onTransitionEnd={handleTransitionEnd}
      className={cx('cookie-bar', {
        '-hidden': !isVisible,
      })}
    >
      <button
        type="button"
        className="cookie-bar__close"
        onClick={hideCookieBar}
      >
        <CloseSharp />
      </button>
      <Text className="cookie-bar__text" size="small">
        We use cookies to improve your experience. Find out more in our{' '}
        <RouterLink
          classNames={{
            color: 'primary',
          }}
          link={{
            href: '/legal/privacy-policy',
            label: 'cookie policy',
          }}
        >
          cookie policy
        </RouterLink>
        .
      </Text>
      <div className="cookie-bar__actions">
        <Button
          fill="solid"
          color="primary"
          label="Accept"
          onClick={hideCookieBar}
        />
        <Button
          fill="outline"
          color="primary"
          label="Decline"
          onClick={hideCookieBar}
        />
      </div>
    </div>
  ) : null;
}

export default CookieBar;
