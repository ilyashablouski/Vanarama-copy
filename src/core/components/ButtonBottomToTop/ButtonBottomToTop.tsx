import React, { useState, useEffect } from 'react';
import Icon from 'core/atoms/icon';
import ArrowForBtnButtomToTop from 'core/assets/icons/ArrowForBtnButtomToTop';

const ButtonBottomToTop = () => {
  const [visibleButton, setVisibleButton] = useState(false);

  const buttonVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 250) {
      setVisibleButton(true);
    } else if (scrolled <= 250) {
      setVisibleButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', buttonVisible);
    return () => window.addEventListener('scroll', buttonVisible);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div
        role="button"
        onClick={scrollToTop}
        className={visibleButton ? 'active scroll-top' : 'scroll-top'}
      >
        <Icon color="white" icon={<ArrowForBtnButtomToTop />} />
      </div>
    </>
  );
};

export default ButtonBottomToTop;
