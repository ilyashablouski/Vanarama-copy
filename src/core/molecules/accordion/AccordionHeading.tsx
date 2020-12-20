import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../interfaces/base';
import Text from '../../atoms/text';
import Icon from '../../atoms/icon';
import ChevronForwardSharp from '../../assets/icons/ChevronForwardSharp';

interface IProps extends IBaseProps {
  onClick: () => void;
  title: string;
}

const AccordionHeading: React.FC<IProps> = ({ onClick, className, title }) => {
  return (
    <button
      className={cx('accordion--heading', className)}
      onClick={onClick}
      type="button"
    >
      <Icon
        icon={<ChevronForwardSharp />}
        className="accordion-item--chevron"
      />
      <div className="accordion--title">
        <Text color="black" size="regular" tag="span">
          {title}
        </Text>
      </div>
    </button>
  );
};

export default AccordionHeading;
