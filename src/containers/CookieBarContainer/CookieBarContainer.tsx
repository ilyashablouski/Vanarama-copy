import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import {
  acceptCookieBlueConic,
  declineCookieBlueConic,
  shouldRenderCookieBar,
} from '../../utils/blueConicHelpers';

const CookieBar = dynamic(() => import('core/organisms/cookie-bar'));

function CookieBarContainer() {
  const [shouldComponentRender, setShouldComponentRender] = useState(true);

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
