import React from 'react';
import Text from 'core/atoms/text';
import BatteryCharging from 'core/assets/icons/BatteryCharging';
import Icon from 'core/atoms/icon';

const FreeHomeChargerLabel = () => {
  return (
    <div className="free-home-charger--container">
      <Icon
        icon={<BatteryCharging />}
        color="white"
        size="regular"
        className="free-home-charger--icon"
      />
      <Text size="small" color="white" tag="span">
        FREE HOME CHARGER WITH INSTALLATION
      </Text>
    </div>
  );
};

export default FreeHomeChargerLabel;
