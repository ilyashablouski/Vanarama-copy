import React, { FC, memo } from 'react';
import cx from 'classnames';

import Icon from '../icon';

import InformationCircleSharp from '../../assets/icons/InformationCircleSharp';

import { ITooltipProps } from './interfaces';

const Tooltip: FC<ITooltipProps> = memo(props => {
  const {
    className,
    color = 'teal',
    icon = <InformationCircleSharp />,
    position = 'top center',
    text,
  } = props;

  return (
    <span
      className={cx('tooltip', className, {
        [`-${color}`]: color,
        [position]: position,
      })}
    >
      <Icon icon={icon} color={color} />
      <span className="tooltiptext" data-tooltip={text} />
    </span>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
