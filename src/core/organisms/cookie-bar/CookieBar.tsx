import React, { AnimationEvent, useState } from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';

import RouterLink from '../../../components/RouterLink';
import {
  pushCookiePreferencesDataLayer,
  pushPageDataWithBCUID,
} from '../../../utils/dataLayerHelpers';
import { TColor } from '../../../types/color';

interface IProps {
  onAccept: () => void;
  onDecline: () => void;
  onAfterHide: () => void;
}

const cookieBarLink = {
  href: '/legal/cookies-policy',
  label: 'cookie policy',
};

const cookieBarLinkClassNames = {
  color: 'primary' as TColor,
};

function CookieBar({ onAccept, onDecline, onAfterHide }: IProps) {
  const [isVisible, setVisible] = useState(true);

  function hideCookieBar() {
    setVisible(false);
  }

  function handleAcceptClick() {
    hideCookieBar();
    onAccept();
    pushPageDataWithBCUID();
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
      <section className="row:">
        <Text className="cookie-dialog__text" size="small">
          This website stores cookies on your computer. These cookies will allow
          us to remember you and your preferences. <br /> We use this
          information to improve your browsing experience. <br /> To find out
          more, please read our{' '}
          <RouterLink
            prefetch={false}
            classNames={cookieBarLinkClassNames}
            link={cookieBarLink}
          >
            <br /> cookie policy
          </RouterLink>
          .
        </Text>
        <Button
          dataUiTestId="cookieBar-decline-button"
          fill="outline"
          color="primary"
          label="Don't Accept"
          onClick={handleDeclineClick}
          className="decline"
        />
        <Button
          dataUiTestId="cookieBar-accept-button"
          fill="solid"
          color="primary"
          label="Accept All"
          onClick={handleAcceptClick}
          className="accept"
        />
      </section>
    </div>
  );
}

export default CookieBar;
