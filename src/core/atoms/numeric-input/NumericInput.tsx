import React from 'react';
import TextInput from '../textinput';
import { INumericInputProps } from './interfaces';

const NUMBER_REGEX = /[0-9]/;

const NumericInput: React.FC<INumericInputProps> = React.forwardRef<
  HTMLInputElement,
  INumericInputProps
>(({ onKeyPress, ...rest }, ref) => (
  <TextInput
    {...rest}
    onKeyPress={e => {
      if (!NUMBER_REGEX.test(e.key)) {
        e.preventDefault();
      } else {
        onKeyPress?.(e);
      }
    }}
    ref={ref}
  />
));

NumericInput.displayName = 'ForwardRef(NumericInput)';
export default NumericInput;
