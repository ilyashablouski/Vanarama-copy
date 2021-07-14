import { IBaseProps } from '../../interfaces/base';
import { Nullish } from '../../../types/common';
import { TColor } from '../../../types/color';

export interface IChoiceBoxesV2Props extends IBaseProps {
  color?: TColor;
  values: Array<string>;
  selectedValues?: Nullish<Array<string>>;
  multiSelect?: boolean;
  disabled?: boolean;
  onChange: (values: Array<string>) => void;
}
