import cx from 'classnames';
import React from 'react';
import { IToggleV2Props } from './interfaces';

const ToggleV2: React.FC<IToggleV2Props> = React.forwardRef<
  HTMLInputElement,
  IToggleV2Props
>(props => {
  const {
    className,
    leftValue,
    rightValue,
    leftLabel,
    rightLabel,
    getValue,
    checked,
  } = props;

  const handleInputChange = (toggleValue: any) => {
    getValue(toggleValue.target.value);
  };
  return (
    <div className={cx('slide-togl', className)}>
      <input
        value={leftValue}
        type="radio"
        id="r1"
        name="t"
        checked={checked}
        onChange={e => handleInputChange(e)}
      />
      <label htmlFor="r1">{leftLabel}</label>
      <input
        value={rightValue}
        type="radio"
        id="r2"
        name="t"
        checked={!checked}
        onChange={e => handleInputChange(e)}
      />
      <label htmlFor="r2">{rightLabel}</label>
      <span className="state" />
    </div>
  );
});

export default React.memo(ToggleV2);
