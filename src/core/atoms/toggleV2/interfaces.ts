import { IBaseProps } from '../../interfaces/base';

export interface IToggleV2Props extends IBaseProps {
  /**
   * A label for the "left" state
   */
  leftLabel: string;
  /**
   * A label for the "right" state
   */
  rightLabel: string;
  /**
   * A value for the "left" state
   */
  leftValue?: string;
  /**
   * A value for the "right" state
   */
  rightValue?: string;
  getValue?: any;
  /**
   * Whether the toggle is checked - in controlled mode
   */
  checked?: boolean;
}
