import React, { AnimationEvent, useState } from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';

import CloseSharp from '../../assets/icons/CloseSharp';
import RouterLink from '../../../components/RouterLink';
import { pushCookiePreferencesDataLayer } from '../../../utils/dataLayerHelpers';

interface IProps {
  onAccept: () => void;
  onDecline: () => void;
  onAfterHide: () => void;
}

function CookieBar({ onAccept, onDecline, onAfterHide }: IProps) {
  const [isVisible, setVisible] = useState(true);

  function hideCookieBar() {
    setVisible(false);
  }

  function handleAcceptClick() {
    hideCookieBar();
    onAccept();
    pushCookiePreferencesDataLayer();
  }

  function handleDeclineClick() {
    hideCookieBar();
    onDecline();
    pushCookiePreferencesDataLayer();
  }

  function handleAnimationEnd({
    animationName,
  }: AnimationEvent<HTMLDivElement>) {
    if (animationName === 'cookieBarFadeOut') {
      onAfterHide();
    }
  }

  return (
    <div
      role="dialog"
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
          dataUiTestId="cookieBar-accept-button"
          fill="solid"
          color="primary"
          label="Accept"
          onClick={handleAcceptClick}
        />
        <Button
          dataUiTestId="cookieBar-decline-button"
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
