import React, { useEffect, useState } from 'react';

import CookieBar from 'core/organisms/cookie-bar';

import {
  acceptBlueConicCookie,
  declineBlueConicCookie,
  isBlueConicClientLoaded,
  updateBlueConicCookiePreferences,
} from '../../utils/blueConicHelpers';

function CookieBarContainer() {
  const [shouldComponentRender, setShouldComponentRender] = useState(true);

  useEffect(() => {
    if (isBlueConicClientLoaded()) {
      return updateBlueConicCookiePreferences();
    }

    window.addEventListener(
      'onBlueConicLoaded',
      updateBlueConicCookiePreferences,
      false,
    );

    return () => {
      window.removeEventListener(
        'onBlueConicLoaded',
        updateBlueConicCookiePreferences,
        false,
      );
    };
  }, []);

  function handleAfterComponentHide() {
    setShouldComponentRender(false);
  }

  return shouldComponentRender ? (
    <CookieBar
      onAccept={acceptBlueConicCookie}
      onDecline={declineBlueConicCookie}
      onAfterHide={handleAfterComponentHide}
    />
  ) : null;
}

export default CookieBarContainer;
