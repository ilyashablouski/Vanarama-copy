import { ChangeEvent } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { INumericInputProps } from '../../atoms/numeric-input/interfaces';

type ChildInputProps = Omit<
  INumericInputProps,
  'disabled' | 'onChange' | 'value' | 'width'
>;

export type SortCodeValue = [string, string, string];

export interface ISortCodeProps extends IBaseProps {
  disabled?: boolean;
  /**
   * Props to apply to the first NumericInput
   */
  firstInputProps?: ChildInputProps;
  /**
   * Props to apply to the last NumericInput
   */
  lastInputProps?: ChildInputProps;
  /**
   * Props to apply to the middle NumericInput
   */
  middleInputProps?: ChildInputProps;
  /**
   * Called when the value is changed. First argument is the change event, second is the value.
   */
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    value: SortCodeValue,
  ) => void;
  value?: SortCodeValue;
}
