import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';

import CloseSharp from '../../assets/icons/CloseSharp';
import RouterLink from '../../../components/RouterLink';

interface IProps {
  isVisible: boolean;
  hideComponent: () => void;
  onAfterHide: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

function CookieBar({
  isVisible,
  hideComponent,
  onAfterHide,
  onAccept,
  onDecline,
}: IProps) {
  function handleAcceptClick() {
    hideComponent();
    onAccept();
  }

  function handleDeclineClick() {
    hideComponent();
    onDecline();
  }

  function handleTransitionEnd() {
    if (!isVisible) {
      onAfterHide();
    }
  }

  return (
    <div
      role="dialog"
      onTransitionEnd={handleTransitionEnd}
      className={cx('cookie-dialog', {
        '-hidden': !isVisible,
      })}
    >
      <button
        type="button"
        className="cookie-dialog__close"
        onClick={hideComponent}
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
