import React from 'react';
import cx from 'classnames';
import Text from 'core/atoms/text';
import Cookies from 'js-cookie';

const FreeInsuranceBanner = () => {
  if (Cookies.get('DIG-6864') !== '1') {
    return (
      <img
        loading="eager"
        sizes="(min-width:320px) 800px, 1200px"
        alt="Free insurance"
        className="gallery-free-insurance"
        src={`${process.env.HOST_DOMAIN}/Assets/images/insurance/1-Year-Free-Insurance.png`}
        data-cfasync="false"
      />
    );
  }

  return (
    <div className={cx('promotion-item', '--primary')}>
      <Text size="regular" color="black" tag="span">
        1 Year’s FREE Insurance
      </Text>
      <Text color="black">{` Incl Courtesy Car`}</Text>
    </div>
  );
};

export default FreeInsuranceBanner;
