import { IBaseProps } from '../../interfaces/base';

export interface IRadioProps extends IBaseProps {
  /**
   * Whether the radio is checked - in controlled mode
   */
  checked?: boolean;
  /**
   * Whether the radio is default checked - in uncontrolled mode
   */
  defaultChecked?: boolean;
  /**
   * Whether the radio is disabled
   */
  disabled?: boolean;
  /**
   * A unique ID for the radio node - this is required here because the
   * underlying radio is hidden and therefore you can only click on the label
   * and the label needs to know which radio it corresponds to
   */
  id: string;
  /**
   * A name for the radio node
   */
  label: string;
  /**
   * The label for the radio
   */
  name?: string;
  /**
   * A callback called when the radio is blurred
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * A callback called when the radio is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * A callback called when the radio is changed in controlled mode
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * A ref to attach to the radio
   */
  ref?: React.Ref<HTMLInputElement>;
  /**
   * The value for the radio
   */
  value?: string;
  children?: React.ReactNode;
}
