import cx from 'classnames';
import React from 'react';
import useAutoFocus from '../../../hooks/useAutoFocus';
import NumericInput from '../../atoms/numeric-input';
import { ISortCodeProps } from './interfaces';

const SortCode: React.FC<ISortCodeProps> = ({
  className,
  dataTestId,
  disabled,
  firstInputProps = {},
  lastInputProps = {},
  middleInputProps = {},
  onChange,
  value: [first, middle, last] = ['', '', ''],
}) => {
  const { handleAutoFocus } = useAutoFocus(3);
  return (
    <div className={cx('sortcode', className)} data-testid={dataTestId}>
      <NumericInput
        {...firstInputProps}
        disabled={disabled}
        max={2}
        onChange={event => {
          if (isLessThanThreeCharacters(event)) {
            onChange(event, [event.target.value, middle, last]);
            handleAutoFocus(event);
          }
        }}
        value={first}
        name="sc-1"
        type="number"
        role="textbox"
      />
      <NumericInput
        {...middleInputProps}
        disabled={disabled}
        max={2}
        onChange={event => {
          if (isLessThanThreeCharacters(event)) {
            onChange(event, [first, event.target.value, last]);
            handleAutoFocus(event);
          }
        }}
        value={middle}
        name="sc-2"
        type="number"
        role="textbox"
      />
      <NumericInput
        {...lastInputProps}
        disabled={disabled}
        max={2}
        onChange={event => {
          if (isLessThanThreeCharacters(event)) {
            onChange(event, [first, middle, event.target.value]);
          }
        }}
        value={last}
        name="sc-3"
        type="number"
        role="textbox"
      />
    </div>
  );
};

function isLessThanThreeCharacters(event: React.ChangeEvent<HTMLInputElement>) {
  return event.target.value.length < 3;
}

export default SortCode;
