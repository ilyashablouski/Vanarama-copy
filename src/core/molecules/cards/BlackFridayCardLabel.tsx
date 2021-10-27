import React from 'react';
import cx from 'classnames';
import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text/Text';
import EarRightIcon from 'core/assets/icons/black-friday/EarRight';
import { IBaseProps } from 'core/interfaces/base';

const BlackFridayCardLabel = ({ className }: IBaseProps) => (
  <div className={cx('bf-card-label', className)}>
    <div className="bf-card-label__inner">
      <Text className="bf-card-label__text" size="large">
        <span>£250</span>
        Cashback
      </Text>
    </div>
    <Icon
      className="bf-card-label__ear"
      icon={<EarRightIcon />}
      size="initial-size"
    />
  </div>
);

export default BlackFridayCardLabel;
