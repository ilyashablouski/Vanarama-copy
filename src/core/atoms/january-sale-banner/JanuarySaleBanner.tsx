import React from 'react';
import { IBaseProps } from 'core/interfaces/base';

const JanuarySaleBanner: React.FC<IBaseProps> = ({ className }) => (
  <div className={`sale-banner colored-section ${className} -mt-200`}>
    <div className="colored-section -orange-wrapper">
      <div className="colored-section -blue-wrapper">
        <div className="colored-section -yellow-wrapper">
          <div className="colored-section -inner-wrapper -flex">
            <div className="sale-banner__inner">
              <span className="sale-banner__aside-text sale-banner__aside-text__bold">
                JANUARY SALE
              </span>
              <span className="sale-banner__sale-text -desktop">
                £250 Cashback On Every Vehicle
              </span>
              <div className="sale-banner__group">
                <span className="sale-banner__aside-text -mobile">
                  £250 Cashback
                </span>
                <span className="sale-banner__aside-text -january sale-banner__aside-text__bold -mobile">
                  Offer Ends 31st Jan 2022
                </span>
                <div className="sale-banner__group -flex-v -a-flex-start -desktop">
                  <span className="sale-banner__aside-text -january -desktop">
                    Offer Ends
                  </span>
                  <span className="sale-banner__aside-text -january -desktop">
                    31st Jan 2022
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JanuarySaleBanner;
