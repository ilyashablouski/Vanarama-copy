import React from 'react';
import cx from 'classnames';
import Text from 'core/atoms/text';
import Cookies from 'js-cookie';

const ElectricVehicleBanner = () => {
  if (Cookies.get('DIG-6864') !== '1') {
    return null;
  }

  return (
    <div className={cx('promotion-item', '--secondary')}>
      <Text size="regular" color="white" className="promotion-item-accent-text">
        Free Home Charger With Installation
      </Text>
      <Text
        color="white"
        className="promotion-item-regular-text"
      >{` Worth £900*`}</Text>
    </div>
  );
};

export default ElectricVehicleBanner;
