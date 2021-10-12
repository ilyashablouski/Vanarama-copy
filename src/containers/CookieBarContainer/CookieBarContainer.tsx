import React, { useEffect, useState } from 'react';

import CookieBar from 'core/organisms/cookie-bar';

import {
  shouldRenderCookieBar,
  acceptCookieBlueConic,
  declineCookieBlueConic,
  isBlueConicClientReady,
} from '../../utils/blueConicHelpers';

function CookieBarContainer() {
  const [isComponentVisible, setComponentVisible] = useState(false);
  const [shouldComponentRender, setShouldComponentRender] = useState(true);

  function handleBlueConicClientReady() {
    if (!shouldRenderCookieBar()) {
      setShouldComponentRender(false);
      return;
    }

    setComponentVisible(true);
  }

  useEffect(() => {
    if (isBlueConicClientReady()) {
      return handleBlueConicClientReady();
    }

    window.addEventListener(
      'onBlueConicLoaded',
      handleBlueConicClientReady,
      false,
    );

    return () => {
      window.removeEventListener(
        'onBlueConicLoaded',
        handleBlueConicClientReady,
        false,
      );
    };
  }, []);

  function hideComponent() {
    setComponentVisible(false);
  }

  function handleAfterComponentHide() {
    setShouldComponentRender(false);
  }

  return shouldComponentRender ? (
    <CookieBar
      isVisible={isComponentVisible}
      hideComponent={hideComponent}
      onAfterHide={handleAfterComponentHide}
      onAccept={acceptCookieBlueConic}
      onDecline={declineCookieBlueConic}
    />
  ) : null;
}

export default CookieBarContainer;
