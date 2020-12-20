import React from 'react';
import cx from 'classnames';
import { ICheckboxProps } from './interfaces';
import Text from '../text';

const Checkbox: React.FC<ICheckboxProps> = React.forwardRef<
  HTMLInputElement,
  ICheckboxProps
>((props, ref) => {
  const {
    checked,
    color = 'teal',
    className,
    dataTestId,
    defaultChecked,
    disabled,
    id,
    invalid,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    outline,
    value,
  } = props;

  return (
    <div
      className={cx(`checkbox -${color}`, className, {
        '-outline': outline,
        '-invalid': invalid,
      })}
    >
      <input
        checked={checked}
        className="checkbox--native"
        data-testid={dataTestId}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        ref={ref}
        type="checkbox"
        value={value}
      />
      <label className="checkbox--label" htmlFor={id}>
        <Text size="regular" color="darker">
          {label}
        </Text>
      </label>
    </div>
  );
});

Checkbox.displayName = 'ForwardRef(Checkbox)';
export default React.memo(Checkbox);
