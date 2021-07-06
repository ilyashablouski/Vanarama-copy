import cx from 'classnames';
import React from 'react';
import { IToggleV2Props } from './interfaces';

const ToggleV2: React.FC<IToggleV2Props> = React.forwardRef<
  HTMLInputElement,
  IToggleV2Props
>(props => {
  const {
    leftId,
    leftName,
    rightId,
    rightName,
    leftDataTestId,
    rightDataTestId,
    className,
    leftValue,
    rightValue,
    leftLabel,
    rightLabel,
    onChange,
    checked,
  } = props;

  const handleInputChange = (
    toggleValue: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(toggleValue.target.value);
  };
  return (
    <div className={cx('slide-togl', className)}>
      <input
        value={leftValue}
        type="radio"
        id={leftId}
        data-testid={leftDataTestId}
        name={leftName}
        checked={checked}
        onChange={e => handleInputChange(e)}
      />
      <label htmlFor={leftId}>{leftLabel}</label>
      <input
        value={rightValue}
        type="radio"
        id={rightId}
        data-testid={rightDataTestId}
        name={rightName}
        checked={!checked}
        onChange={e => handleInputChange(e)}
      />
      <label htmlFor={rightId}>{rightLabel}</label>
      <span className="state" />
    </div>
  );
});

export default React.memo(ToggleV2);
