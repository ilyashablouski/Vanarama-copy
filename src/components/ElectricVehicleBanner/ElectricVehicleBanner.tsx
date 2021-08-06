import React from 'react';
import cx from 'classnames';
import Text from 'core/atoms/text';

const ElectricVehicleBanner = () => {
  return (
    <div className={cx('promotion-item', '--secondary')}>
      <Text size="regular" color="white" className="promotion-item-accent-text">
        Free Home Charger With Installation
      </Text>
    </div>
  );
};

export default ElectricVehicleBanner;
