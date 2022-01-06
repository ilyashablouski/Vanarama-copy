import React from 'react';
import { useMobileViewport } from '../../hooks/useMediaQuery';

const ColoredCircles = () => (
  <>
    <div className="common-circle orange-circle" />
    <div className="common-circle blue-circle" />
    <div className="common-circle yellow-circle" />
    <div className="common-circle white-circle" />
  </>
);

const JanuarySaleBanners = () => {
  const isMobile = useMobileViewport();

  return isMobile ? (
    <div className="jan-sale__container">
      <div className="text-container">
        <div className="sale-text-container">
          <span className="sale-text">JANUARY SALE</span>
        </div>
        <div className="mobile-text__container">
          <span className="aside-text">£250 CASHBACK</span>
          <span className="aside-text january-text">End 31st January</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="jan-sale__container">
      <div className="colored-section left-section">{ColoredCircles()}</div>
      <div className="text-container">
        <span className="aside-text">£250 CASHBACK</span>
        <div className="sale-text-container">
          <span className="sale-text">JANUARY SALE</span>
        </div>
        <span className="aside-text january-text">End 31st January</span>
      </div>
      <div className="colored-section right-section">{ColoredCircles()}</div>
    </div>
  );
};

export default JanuarySaleBanners;
