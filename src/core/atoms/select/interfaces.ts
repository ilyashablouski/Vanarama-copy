import { IBaseProps } from '../../interfaces/base';

export interface ISelectProps extends IBaseProps {
  children: React.ReactNode;
  /**
   * The default value for the select when used in uncontrolled mode
   */
  defaultValue?: string;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Invalid state of the select component
   */
  invalid?: boolean;
  /**
   * A unique ID for the select node
   */
  id?: string;
  /**
   * A name for the select node
   */
  name?: string;
  /**
   * A callback called when the select is blurred
   */
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /**
   * A callback called when the select is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /**
   * A callback called when the select is changed in controlled mode
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * A placeholder for the select - defaults to 'Please Select'
   */
  placeholder?: string;
  /**
   * The value of the select in controlled mode
   */
  value?: string;
  /**
   * A ref to attach to the select
   */
  ref?: React.Ref<HTMLSelectElement>;
}
