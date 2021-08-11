import { IBaseProps } from '../../interfaces/base';
import { Nullish } from '../../../types/common';
import { TColor } from '../../../types/color';

export interface IChoiceBoxesV2Props extends IBaseProps {
  boxClassName?: string;
  labelClassName?: string;
  color?: TColor;
  name?: string;
  values: Array<string | number>;
  selectedValues?: Nullish<Array<string | number>>;
  multiSelect?: boolean;
  disabled?: boolean;
  onChange: (values: Array<string | number>) => void;
  idPrefix?: string;
}
