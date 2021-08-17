import React, { useState } from 'react';

import CookieBar from 'core/organisms/cookie-bar';

import {
  acceptCookieBlueConic,
  declineCookieBlueConic,
  shouldRenderCookieBar,
} from '../../utils/blueConicHelpers';
import { isCookieBarFeatureEnabled } from '../../utils/helpers';

function CookieBarContainer() {
  const [shouldComponentRender, setShouldComponentRender] = useState(
    !isCookieBarFeatureEnabled(),
  );

  function handleBeforeComponentShow() {
    if (!shouldRenderCookieBar()) {
      setShouldComponentRender(false);
    }
  }

  function handleAfterComponentHide() {
    setShouldComponentRender(false);
  }

  return shouldComponentRender ? (
    <CookieBar
      onAccept={acceptCookieBlueConic}
      onDecline={declineCookieBlueConic}
      onBeforeShow={handleBeforeComponentShow}
      onAfterHide={handleAfterComponentHide}
    />
  ) : null;
}

export default CookieBarContainer;
