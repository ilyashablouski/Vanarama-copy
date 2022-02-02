import React, { FC, ReactNode } from 'react';
import Icon from 'core/atoms/icon';

interface IProps {
  text: string | ReactNode;
  icon?: ReactNode;
  className?: string;
  dataUiTestId?: string;
}

const CardLabel: FC<IProps> = ({ icon, text, className, dataUiTestId }) => {
  return (
    <span className={className} data-uitestid={dataUiTestId}>
      {icon && <Icon icon={icon} />}
      {text}
    </span>
  );
};

export default CardLabel;
