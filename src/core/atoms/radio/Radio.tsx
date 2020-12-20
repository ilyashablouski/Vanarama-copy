import cx from 'classnames';
import React from 'react';
import Text from '../text';
import { IRadioProps } from './interfaces';

const Radio: React.FC<IRadioProps> = React.forwardRef<
  HTMLInputElement,
  IRadioProps
>((props, ref) => {
  const {
    checked,
    className,
    dataTestId,
    defaultChecked,
    disabled,
    id,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    value,
    children,
  } = props;

  return (
    <div className={cx('radio', className)}>
      <input
        checked={checked}
        className="radio--native"
        data-testid={dataTestId}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        ref={ref}
        type="radio"
        value={value}
      />
      <label className="radio--label" htmlFor={id}>
        {children ? (
          <div className="radio--content">
            <Text size="regular" color="darker">
              {label}
            </Text>
            {children}
          </div>
        ) : (
          <Text size="regular" color="darker">
            {label}
          </Text>
        )}
      </label>
    </div>
  );
});

Radio.displayName = 'ForwardRef(Radio)';
export default React.memo(Radio);
