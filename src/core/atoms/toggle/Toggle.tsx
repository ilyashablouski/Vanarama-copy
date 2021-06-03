import cx from 'classnames';
import React from 'react';
import { IToggleProps } from './interfaces';

const Toggle: React.FC<IToggleProps> = React.forwardRef<
  HTMLInputElement,
  IToggleProps
>((props, ref) => {
  const {
    checked,
    className,
    color = 'orange',
    dataTestId,
    defaultChecked,
    disabled,
    id,
    name,
    offLabel,
    onBlur,
    onChange,
    onFocus,
    onLabel,
    customCTAColor,
  } = props;

  const customStyles = {
    background: customCTAColor,
    borderColor: customCTAColor,
  };

  return (
    <div className={cx('toggle--wrapper', className)}>
      <input
        checked={checked}
        className="toggle toggle--input"
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
      />
      <label
        className={cx('toggle--input-label', `-${color}`, {
          '-disabled': disabled,
        })}
        htmlFor={id}
      >
        <span className="toggle--switch">
          {checked ? (
            <span className="toggle--off" style={customStyles}>
              {onLabel}
            </span>
          ) : (
            <span className="toggle--off">{onLabel}</span>
          )}
          {!checked ? (
            <span className="toggle--on" style={customStyles}>
              {onLabel}
            </span>
          ) : (
            <span className="toggle--on">{offLabel}</span>
          )}
        </span>
      </label>
    </div>
  );
});

Toggle.displayName = 'ForwardRef(Toggle)';
export default React.memo(Toggle);
