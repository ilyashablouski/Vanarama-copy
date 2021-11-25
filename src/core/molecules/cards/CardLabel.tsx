import React, { FC, ReactNode } from 'react';
import Icon from 'core/atoms/icon';

interface IProps {
  text: string | ReactNode;
  icon?: ReactNode;
  className?: string;
}

const CardLabel: FC<IProps> = ({ icon, text, className }) => {
  return (
    <span className={className}>
      {icon && <Icon icon={icon} />}
      {text}
    </span>
  );
};

export default CardLabel;
