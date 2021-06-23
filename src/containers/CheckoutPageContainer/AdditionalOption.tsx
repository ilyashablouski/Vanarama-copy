import { forwardRef, FC } from 'react';
import cx from 'classnames';
import Text from 'core/atoms/text';
import Tooltip from 'core/atoms/tooltip';
import ToggleSwitch from 'core/atoms/toggle/ToggleSwitch';
import Icon from 'core/atoms/icon';

import { IAdditionalOptionProps } from './interfaces';

const AdditionalOption: FC<IAdditionalOptionProps> = forwardRef<
  HTMLInputElement,
  IAdditionalOptionProps
>((props, ref) => {
  const {
    id,
    name,
    title,
    className,
    tooltipText,
    includedText,
    promotionText,
    onTooltipClick,
    ...args
  } = props;

  return (
    <div className={cx('add-on', className, { '-added': props.checked })}>
      <Text tag="span">
        {title}
        <Icon
          onClick={onTooltipClick}
          icon={<Tooltip text={tooltipText} position="center" />}
        />
        <Text tag="span" className="included">
          {includedText}
        </Text>
      </Text>
      <Text tag="span">{promotionText}</Text>
      <ToggleSwitch {...args} ref={ref} id={id} name={name} />
    </div>
  );
});

export default AdditionalOption;
