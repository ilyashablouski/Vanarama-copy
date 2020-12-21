import { IBaseProps } from '../../interfaces/base';

export interface IFormgroupProps extends IBaseProps {
  children?: React.ReactNode;
  /**
   * The ID of the control this is wrapping
   */
  controlId?: string;
  /**
   * An optional error message to display.
   */
  error?: string | React.ReactNode;
  /**
   * Use hint text for help that’s relevant to the majority of users, like how their information will be used, or where to find it.
   */
  hint?: string;
  /**
   * Whether to display the children inline
   */
  inline?: boolean;
  /**
   * A label for the inputs
   */
  label?: string;
  /**
   * Whether to display the children editable
   */
  editable?: string;
}
