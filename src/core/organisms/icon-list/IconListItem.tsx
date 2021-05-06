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
  listStyle
}) => {
  return (
    <li className={className} data-testid={dataTestId} style={{listStyle: listStyle && listStyle}}>
      <Icon icon={listIcon} color={iconColor} />
      {children}
    </li>
  );
};

export default IconListItem;
