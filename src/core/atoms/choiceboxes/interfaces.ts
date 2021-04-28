import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';

export interface IChoice {
  label: string;
  active: boolean;
  value?: string;
}

export interface IChoiceboxesProps extends IBaseProps {
  color?: TColor;
  choices: IChoice[];
  onSubmit: (choice: IChoice) => void;
  multiSelect?: boolean;
  disabled?: boolean | undefined;
  clearMultiSelectTitle?: string;
  onClearClick?: () => void;
  withIcons?: boolean;
  currentValue?: string | string[];
  shouldSelectTheOnlyValue?: boolean;
  setIndex?: number;
}
