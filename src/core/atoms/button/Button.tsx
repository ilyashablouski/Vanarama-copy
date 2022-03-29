import cx from 'classnames';
import React from 'react';
import Icon from '../icon';
import { IButtonProps } from './interfaces';

const WrappedButton = React.forwardRef<HTMLButtonElement, IButtonProps>(
  function Button(props, ref) {
    const {
      className,
      color = 'secondary',
      dataTestId,
      dataUiTestId,
      disabled,
      fill = 'solid',
      icon,
      iconColor,
      iconPosition,
      label,
      round,
      size = 'regular',
      withoutDefaultClass,
      customCTAColor,
      iconClassName,
      ...rest
    } = props;

    const renderIcon = () => (
      <Icon icon={icon} color={iconColor} className={iconClassName} />
    );
    const customStyles = {
      backgroundColor: customCTAColor,
    };
    if (customCTAColor) {
      return (
        // eslint-disable-next-line react/button-has-type
        <button
          {...rest}
          className={cx(
            {
              // eslint-disable-next-line prettier/prettier
              button: !withoutDefaultClass,
            },
            className,
            `-${color} -${size} -${fill}`,
            {
              '-disabled': disabled,
              '-round': round,
            },
          )}
          disabled={disabled}
          data-testid={dataTestId}
          data-uitestid={dataUiTestId}
          ref={ref}
          style={customStyles}
        >
          <div className="button--inner">
            {icon && iconPosition === 'before' && renderIcon()}
            {label}
            {icon && iconPosition === 'after' && renderIcon()}
          </div>
        </button>
      );
    }

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        {...rest}
        className={cx(
          {
            // eslint-disable-next-line prettier/prettier
            button: !withoutDefaultClass,
          },
          className,
          `-${color} -${size} -${fill}`,
          {
            '-disabled': disabled,
            '-round': round,
          },
        )}
        disabled={disabled}
        data-testid={dataTestId}
        data-uitestid={dataUiTestId}
        ref={ref}
      >
        <div className="button--inner">
          {icon && iconPosition === 'before' && renderIcon()}
          {label}
          {icon && iconPosition === 'after' && renderIcon()}
        </div>
      </button>
    );
  },
);

export default React.memo(WrappedButton);
