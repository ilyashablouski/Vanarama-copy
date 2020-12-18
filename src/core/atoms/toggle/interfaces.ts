import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';

export interface IToggleProps extends IBaseProps {
  /**
   * The color to use from your application's color palette - default to 'orange'
   */
  color?: TColor;
  /**
   * Whether the toggle is checked - in controlled mode
   */
  checked?: boolean;
  /**
   * Whether the toggle is default checked - in uncontrolled mode
   */
  defaultChecked?: boolean;
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
  /**
   * A unique ID for the input node - this is required here because the
   * underlying input is hidden and therefore you can only click on the label
   * and the label needs to know which input it corresponds to
   */
  id: string;
  /**
   * A label for the "on" state
   */
  onLabel: string;
  /**
   * A label for the "off" state
   */
  offLabel: string;
  /**
   * The name for the toggle
   */
  name?: string;
  /**
   * A callback called when the toggle is blurred
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * A callback called when the toggle is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * A callback called when the toggle is changed in controlled mode
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * A ref to attach to the toggle
   */
  ref?: React.Ref<HTMLInputElement>;
}
