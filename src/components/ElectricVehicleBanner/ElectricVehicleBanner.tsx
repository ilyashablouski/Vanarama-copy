import React from 'react';
import cx from 'classnames';
import Text from 'core/atoms/text';

const ElectricVehicleBanner = () => {
  return (
    <div className={cx('promotion-item', '--secondary')}>
      <Text size="regular" color="white">
        Free Home Charger With Installation
      </Text>
      <Text color="white">{` Worth £900*`}</Text>
    </div>
  );
};

export default ElectricVehicleBanner;
