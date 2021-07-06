import { IBaseProps } from '../../interfaces/base';

export interface IToggleV2Props extends IBaseProps {
  /**
   * A unique IDs for the input node - this is required here because the
   * underlying input is hidden and therefore you can only click on the label
   * and the label needs to know which input it corresponds to
   */
  leftId: string;
  rightId: string;
  /**
   * The names for the toggle
   */
  leftName?: string;
  rightName?: string;
  /**
   * The attributes to add to the root node for automation testing
   */
  leftDataTestId?: string;
  rightDataTestId?: string;
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
  getValue: (text: string) => void;
  /**
   * Whether the toggle is checked - in controlled mode
   */
  checked?: boolean;
}
