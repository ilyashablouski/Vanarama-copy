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
    dataUiTestId,
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
        onChange={event => handleInputChange(event)}
        data-uitestid={`${dataUiTestId}_input_${leftLabel}`}
      />
      <label
        htmlFor={leftId}
        data-uitestid={`${dataUiTestId}_label_${leftLabel}`}
      >
        {leftLabel}
      </label>
      <input
        value={rightValue}
        type="radio"
        id={rightId}
        data-testid={rightDataTestId}
        name={rightName}
        checked={!checked}
        onChange={event => handleInputChange(event)}
        data-uitestid={`${dataUiTestId}_input_${rightLabel}`}
      />
      <label
        htmlFor={rightId}
        data-uitestid={`${dataUiTestId}_label_${rightLabel}`}
      >
        {rightLabel}
      </label>
      <span className="state" />
    </div>
  );
});

export default React.memo(ToggleV2);
