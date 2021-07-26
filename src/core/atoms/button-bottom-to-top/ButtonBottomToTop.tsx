import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'core/atoms/icon';
import ArrowUp from 'core/assets/icons/ArrowUp';

const ButtonBottomToTop = () => {
  const [visibleButton, setVisibleButton] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const buttonVisible = () => {
      const currentPosition = document.documentElement.scrollTop;

      if (currentPosition > 250) {
        setVisibleButton(true);
      } else {
        setVisibleButton(false);
      }
    };
    window.addEventListener('scroll', buttonVisible);

    return () => window.removeEventListener('scroll', buttonVisible);
  }, []);

  return (
    <>
      <div
        role="button"
        onClick={scrollToTop}
        className={visibleButton ? 'active scroll-top' : 'scroll-top'}
      >
        <Icon size="regular" color="white" icon={<ArrowUp />} />
      </div>
    </>
  );
};

export default ButtonBottomToTop;
