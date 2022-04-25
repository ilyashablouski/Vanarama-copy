import React, { FC, memo } from 'react';
import Script from 'next/script';

const CookieBarScript: FC = () => {
  const code = `
  (function() {
    document.addEventListener('animationstart', ({ 
      animationName 
    }) => {
      if (animationName === 'cookieBarFadeIn') {
        handleBeforeCookieBarShow();
      }
    });
    
    function handleBeforeCookieBarShow() {
      if (!shouldRenderCookieBar()) {
        removeCookieBarElement();
      }
    }
    
    function shouldRenderCookieBar() {
      return !window.localStorage.getItem('cookiePreferences');
    }
    
    function removeCookieBarElement() {
      const cookieBarElement = document.querySelector('.cookie-dialog');
      
      if (cookieBarElement) {
        cookieBarElement.remove();
      }
    }
  })();
  `;

  return (
    <Script
      data-cfasync="false"
      type="text/javascript"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: code,
      }}
    />
  );
};

export default memo(CookieBarScript);
