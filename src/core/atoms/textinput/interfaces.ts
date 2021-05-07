import { IBaseProps } from '../../interfaces/base';

export interface ITextInputProps
  extends IBaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * A non-editable state with visual distinction showing a value that is calculated by the application rather than entered by the user
   */
  calculated?: boolean;
  /**
   * Prefix a field with a character - useful for currencies
   */
  prefix?: string;
  /**
   * Suffix a field with a character
   */
  suffix?: string;
  /**
   * A ref to attach to the input
   */
  ref?: React.Ref<HTMLInputElement>;
  /**
   * Max input length
   */
  max?: number | string;
  /**
   * prevent default classes
   */
  isNative?: boolean;
}
