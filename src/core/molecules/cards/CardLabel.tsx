import { FC, ReactNode } from 'react';
import Icon from 'core/atoms/icon';

interface IProps {
  text: string | ReactNode;
  icon: ReactNode;
}

const CardLabel: FC<IProps> = ({ icon, text }) => {
  return (
    <span>
      <Icon icon={icon} />
      {text}
    </span>
  );
};

export default CardLabel;
