import React from 'react';
import cx from 'classnames';
import Text from 'core/atoms/text';

const FreeInsuranceBanner = () => {
  return (
    <div className={cx('promotion-item', '--primary')}>
      <Text
        size="regular"
        color="black"
        tag="span"
        className="promotion-item-accent-text"
      >
        1 Year’s FREE Insurance
      </Text>
    </div>
  );
};

export default FreeInsuranceBanner;
