import { IBaseProps } from '../../interfaces/base';

export interface ITextareaProps extends IBaseProps {
  /**
   * Specifies the visible width of a textarea - defaults to 50.
   */
  cols?: number;
  /**
   * The default value for the textarea when used in uncontrolled mode
   */
  defaultValue?: string;
  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;
  /**
   * A unique ID for the textarea node
   */
  id?: string;
  /**
   * A name for the textarea node
   */
  name?: string;
  /**
   * A callback called when the textarea is blurred
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * A callback called when the textarea is changed in controlled mode
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * A callback called when the textarea is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * A placeholder for the textarea
   */
  placeholder?: string;
  /**
   * The number of rows of text to show - defaults to 4.
   */
  rows?: number;
  /**
   * The value of the textarea in controlled mode
   */
  value?: string;
  /**
   * A ref to attach to the textarea
   */
  ref?: React.Ref<HTMLTextAreaElement>;
}
