import cx from 'classnames';
import React from 'react';
import { IToggleSwitchProps } from './interfaces';

const ToggleSwitch: React.FC<IToggleSwitchProps> = React.forwardRef<
  HTMLInputElement,
  IToggleSwitchProps
>((props, ref) => {
  const {
    id,
    name,
    onBlur,
    onFocus,
    checked,
    onChange,
    disabled,
    className,
    dataTestId,
    defaultChecked,
    dataUiTestId,
  } = props;

  return (
    <div className={cx('toggle-switch', className)}>
      <input
        id={id}
        ref={ref}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        data-testid={dataTestId}
        defaultChecked={defaultChecked}
        type="checkbox"
        data-uitestid={dataUiTestId}
      />
      <span />
    </div>
  );
});

ToggleSwitch.displayName = 'ForwardRef(toggle-switch)';
export default React.memo(ToggleSwitch);
