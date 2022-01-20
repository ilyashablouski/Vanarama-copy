import React from 'react';
import { IBaseProps } from 'core/interfaces/base';

const JanuarySaleBannerV2: React.FC<IBaseProps> = ({ className }) => (
  <div className={`colored-section -orange-wrapper ${className}`}>
    <div className="colored-section -blue-wrapper">
      <div className="colored-section -yellow-wrapper">
        <div className="colored-section -inner-wrapper -flex">
          <div className="sale-banner__inner">
            <div className="sale-banner__sticker">
              <span className="sale-banner__sale-text">JANUARY SALE</span>
            </div>
            <span className="sale-banner__aside-text">£250 CASHBACK</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JanuarySaleBannerV2;
