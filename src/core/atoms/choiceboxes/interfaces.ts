import { Dispatch, SetStateAction } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';

export interface IChoice {
  label: string;
  active: boolean;
  value?: string;
}

export interface IChoiceBoxesProps extends IBaseProps {
  boxClassName?: string;
  labelClassName?: string;
  color?: TColor;
  choices: IChoice[];
  multiSelect?: boolean;
  disabled?: boolean | undefined;
  clearMultiSelectTitle?: string;
  onClearClick?: () => void;
  withIcons?: boolean;
  currentValue?: string | string[];
  shouldSelectTheOnlyValue?: boolean;
  choiceIndex?: number;
  setChoiceIndex?: Dispatch<SetStateAction<number>>;
  onSubmit: (choice: IChoice) => void;
}
