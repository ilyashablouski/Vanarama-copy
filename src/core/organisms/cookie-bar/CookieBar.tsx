import React, { AnimationEvent, useState } from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';

import CloseSharp from '../../assets/icons/CloseSharp';
import RouterLink from '../../../components/RouterLink';

interface IProps {
  onAccept: () => void;
  onDecline: () => void;
  onBeforeShow: () => void;
  onAfterHide: () => void;
}

function CookieBar({ onAccept, onDecline, onBeforeShow, onAfterHide }: IProps) {
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

  function handleAnimationStart({
    animationName,
  }: AnimationEvent<HTMLDivElement>) {
    if (animationName === 'fadeIn') {
      onBeforeShow();
    }
  }

  function handleAnimationEnd({
    animationName,
  }: AnimationEvent<HTMLDivElement>) {
    if (animationName === 'fadeOut') {
      onAfterHide();
    }
  }

  return (
    <div
      role="dialog"
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
      className={cx('cookie-dialog', {
        '-hide': !isVisible,
      })}
    >
      <button
        type="button"
        className="cookie-dialog__close"
        onClick={hideCookieBar}
      >
        <CloseSharp />
      </button>
      <Text className="cookie-dialog__text" size="small">
        We use cookies to improve your experience. Find out more in our{' '}
        <RouterLink
          prefetch={false}
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
      <div className="cookie-dialog__actions">
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
  );
}

export default CookieBar;
