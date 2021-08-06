import React, { AnimationEvent, useState } from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';

import CloseSharp from '../../assets/icons/CloseSharp';
import RouterLink from '../../../components/RouterLink';

interface IProps {
  onAccept: () => void;
  onDecline: () => void;
}

function CookieBar({ onAccept, onDecline }: IProps) {
  const [isActive, setActive] = useState(true);
  const [isVisible, setVisible] = useState(true);

  function hideCookieBar() {
    setVisible(false);
  }

  function handleAcceptClick() {
    hideCookieBar();
    onAccept();
  }

  function handleDeclineClick() {
    hideCookieBar();
    onDecline();
  }

  function handleAnimationEnd({
    target,
    currentTarget,
  }: AnimationEvent<HTMLDivElement>) {
    if (target === currentTarget && !isVisible) {
      setActive(false);
    }
  }

  return isActive ? (
    <div
      role="dialog"
      onAnimationEnd={handleAnimationEnd}
      className={cx('cookie-bar', {
        '-hide': !isVisible,
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
          onClick={handleAcceptClick}
        />
        <Button
          fill="outline"
          color="primary"
          label="Decline"
          onClick={handleDeclineClick}
        />
      </div>
    </div>
  ) : null;
}

export default CookieBar;
