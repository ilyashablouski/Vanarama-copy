import cx from 'classnames';
import React from 'react';
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
}) => (
  <div className={cx('sortcode', className)} data-testid={dataTestId}>
    <NumericInput
      {...firstInputProps}
      disabled={disabled}
      max={2}
      onChange={e => {
        if (isLessThanThreeCharacters(e)) {
          onChange(e, [e.target.value, middle, last]);
        }
      }}
      value={first}
    />
    <NumericInput
      {...middleInputProps}
      disabled={disabled}
      max={2}
      onChange={e => {
        if (isLessThanThreeCharacters(e)) {
          onChange(e, [first, e.target.value, last]);
        }
      }}
      value={middle}
    />
    <NumericInput
      {...lastInputProps}
      disabled={disabled}
      max={2}
      onChange={e => {
        if (isLessThanThreeCharacters(e)) {
          onChange(e, [first, middle, e.target.value]);
        }
      }}
      value={last}
    />
  </div>
);

function isLessThanThreeCharacters(e: React.ChangeEvent<HTMLInputElement>) {
  return e.target.value.length < 3;
}

export default SortCode;
