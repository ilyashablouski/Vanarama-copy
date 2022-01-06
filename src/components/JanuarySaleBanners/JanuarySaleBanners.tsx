import React from 'react';
import { IBaseProps } from 'core/interfaces/base';

const JanuarySaleBanners: React.FC<IBaseProps> = ({ className }) => (
  <div className={`sale-banner colored-section -orange-wrapper ${className}`}>
    <div className="colored-section -blue-wrapper">
      <div className="colored-section -yellow-wrapper">
        <div className="colored-section -inner-wrapper">
          <div className="sale-banner__inner">
            <span className="sale-banner__aside-text -desktop">
              £250 CASHBACK
            </span>
            <div className="sale-banner__sticker">
              <span className="sale-banner__sale-text">JANUARY SALE</span>
            </div>
            <div className="sale-banner__group">
              <span className="sale-banner__aside-text -mobile">
                £250 CASHBACK
              </span>
              <span className="sale-banner__aside-text -january">
                End 31st January
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JanuarySaleBanners;
