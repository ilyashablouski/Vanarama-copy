import { InputHTMLAttributes, ReactElement } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';

export interface ICheckboxProps
  extends IBaseProps,
    InputHTMLAttributes<HTMLInputElement> {
  /**
   * A color for the checkbox.
   */
  color?: TColor;
  /**
   * A unique ID for the checkbox node - this is required here because the
   * underlying checkbox is hidden and therefore you can only click on the label
   * and the label needs to know which input it corresponds to.
   */
  id: string;
  /**
   * 	Invalid state of the checkbox.
   */
  invalid?: boolean;
  /**
   * A name for the input node.
   */
  label: string | (string | ReactElement)[];
  /**
   * Outlined state of the checkbox.
   */
  outline?: boolean;
  /**
   * A ref to attach to the checkbox.
   */
  ref?: React.Ref<HTMLInputElement>;
}
