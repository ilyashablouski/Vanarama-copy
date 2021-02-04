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
        onChange={e => {
          if (isLessThanThreeCharacters(e)) {
            onChange(e, [e.target.value, middle, last]);
            console.log('heee');
            handleAutoFocus(e);
          }
        }}
        value={first}
        name="sc-1"
      />
      <NumericInput
        {...middleInputProps}
        disabled={disabled}
        max={2}
        onChange={e => {
          if (isLessThanThreeCharacters(e)) {
            onChange(e, [first, e.target.value, last]);
            handleAutoFocus(e);
          }
        }}
        value={middle}
        name="sc-2"
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
        name="sc-3"
      />
    </div>
  );
};

function isLessThanThreeCharacters(e: React.ChangeEvent<HTMLInputElement>) {
  return e.target.value.length < 3;
}

export default SortCode;
