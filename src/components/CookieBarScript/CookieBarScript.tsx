import React, { FC, memo } from 'react';

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
    <script
      async
      data-cfasync="false"
      type="text/javascript"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: code,
      }}
    />
  );
};

export default memo(CookieBarScript);
