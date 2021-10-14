import React, { useEffect, useState } from 'react';

import CookieBar from 'core/organisms/cookie-bar';

import {
  acceptBlueConicCookie,
  declineBlueConicCookie,
  shouldRenderCookieBar,
  isBlueConicClientLoaded,
  updateBlueConicCookiePreferences,
} from '../../utils/blueConicHelpers';

function CookieBarContainer() {
  const [shouldComponentRender, setShouldComponentRender] = useState(true);

  useEffect(() => {
    if (isBlueConicClientLoaded()) {
      updateBlueConicCookiePreferences();
    } else {
      window.addEventListener(
        'onBlueConicLoaded',
        updateBlueConicCookiePreferences,
        false,
      );
    }

    return () => {
      window.removeEventListener(
        'onBlueConicLoaded',
        updateBlueConicCookiePreferences,
        false,
      );
    };
  }, []);

  async function handleBeforeComponentShow() {
    const shouldRender = await shouldRenderCookieBar();

    if (!shouldRender) {
      setShouldComponentRender(false);
    }
  }

  function handleAfterComponentHide() {
    setShouldComponentRender(false);
  }

  return shouldComponentRender ? (
    <CookieBar
      onAccept={acceptBlueConicCookie}
      onDecline={declineBlueConicCookie}
      onBeforeShow={handleBeforeComponentShow}
      onAfterHide={handleAfterComponentHide}
    />
  ) : null;
}

export default CookieBarContainer;
