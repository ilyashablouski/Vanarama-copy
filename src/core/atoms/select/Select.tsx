import React from 'react';
import cx from 'classnames';
import ChevronDown from '../../assets/icons/ChevronDown';
import Icon from '../icon';
import { ISelectProps } from './interfaces';

const Select: React.FC<ISelectProps> = React.forwardRef<
  HTMLSelectElement,
  ISelectProps
>((props, ref) => {
  const {
    children,
    className,
    dataTestId,
    defaultValue,
    disabled,
    id,
    invalid,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder = 'Please Select',
    value,
    ...rest
  } = props;

  const isControlledMode = Boolean(onChange);
  const showPlaceholder = Boolean(!value && !defaultValue);

  return (
    <div className={cx('select', className, { '-invalid': invalid })}>
      <select
        {...rest}
        id={id}
        className="select--native"
        data-testid={dataTestId}
        defaultValue={
          showPlaceholder && !isControlledMode ? placeholder : defaultValue
        }
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        ref={ref}
        value={showPlaceholder && isControlledMode ? placeholder : value}
      >
        <option disabled value={placeholder}>
          {placeholder}
        </option>
        {children}
      </select>
      <span className="icon select--chevron">
        <Icon icon={<ChevronDown />} className="-stroke -dark" />
      </span>
    </div>
  );
});

Select.displayName = 'ForwardRef(Select)';
export default React.memo(Select);
