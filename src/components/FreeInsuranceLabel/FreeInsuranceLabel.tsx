import React from 'react';
import dynamic from 'next/dynamic';
import ShieldOutline from 'core/assets/icons/ShieldOutline';
import Icon from 'core/atoms/icon';

const Text = dynamic(() => import('core/atoms/text'));

const FreeInsuranceLabel = () => {
  return (
    <div className="yellow-tag">
      <Icon
        icon={<ShieldOutline />}
        color="black"
        size="regular"
        className="yellow-tag--icon"
      />
      <Text tag="span" size="small" color="black">
        FREE INSURANCE
      </Text>
    </div>
  );
};

export default FreeInsuranceLabel;
