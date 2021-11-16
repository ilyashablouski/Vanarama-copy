import cx from 'classnames';
import React from 'react';
import Text from '../text';
import { ITextInputProps } from './interfaces';

const TextInput: React.FC<ITextInputProps> = React.forwardRef<
  HTMLInputElement,
  ITextInputProps
>((props, ref) => {
  const {
    calculated,
    className,
    dataTestId,
    prefix,
    type = 'text',
    width,
    suffix,
    max,
    isNative = true,
    dataUiTestId,
    ...rest
  } = props;

  const style = typeof width !== 'undefined' ? { width } : undefined;
  return (
    <div className={cx('textinput regular', className)} style={style}>
      <input
        maxLength={max ? Number(max) : undefined}
        {...rest}
        className={cx(className, {
          'textinput--native regular': isNative,
          '-calculated': calculated,
          '-prefix': prefix,
          '-suffix': suffix,
        })}
        data-testid={dataTestId}
        data-uitestid={dataUiTestId}
        ref={ref}
        type={type}
        readOnly={calculated}
      />
      {prefix && (
        <Text className="textinput--prefix" size="regular" color="dark">
          {prefix}
        </Text>
      )}
      {suffix && (
        <Text className="textinput--suffix" size="regular" color="dark">
          {suffix}
        </Text>
      )}
    </div>
  );
});

TextInput.displayName = 'ForwardRef(TextInput)';
export default React.memo(TextInput);
