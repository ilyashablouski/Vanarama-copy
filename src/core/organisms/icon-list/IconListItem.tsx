import React from 'react';

import Icon from '../../atoms/icon';
import CheckmarkCircleSharp from '../../assets/icons/CheckmarkCircleSharp';

import { IIconListItemProps } from './interface';

const IconListItem: React.FC<IIconListItemProps> = ({
  children,
  className,
  listIcon = <CheckmarkCircleSharp />,
  iconColor,
  dataTestId,
}) => {
  return (
    <li className={className} data-testid={dataTestId}>
      <Icon icon={listIcon} color={iconColor} />
      {children}
    </li>
  );
};

export default IconListItem;
