import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'core/atoms/icon';
import ArrowForButtonButtomToTop from 'core/assets/icons/ArrowForButtonButtomToTop';

const ButtonBottomToTop = () => {
  const [visibleButton, setVisibleButton] = useState(false);

  const buttonVisible = () => {
    const currentPosition = document.documentElement.scrollTop;

    if (currentPosition > 250) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', buttonVisible);
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <div
        role="button"
        onClick={scrollToTop}
        className={visibleButton ? 'active scroll-top' : 'scroll-top'}
      >
        <Icon color="white" icon={<ArrowForButtonButtomToTop />} />
      </div>
    </>
  );
};

export default ButtonBottomToTop;
