import { Dispatch, SetStateAction } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';
import { Nullish } from '../../../types/common';

export interface IChoice {
  label: string;
  active: boolean;
  value?: string;
}

export interface IChoiceBoxesProps extends IBaseProps {
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

export interface IChoiceBoxesV2Props extends IBaseProps {
  color?: TColor;
  values: Array<string>;
  selectedValues?: Nullish<Array<string>>;
  multiSelect?: boolean;
  disabled?: boolean;
  onChange: (values: Array<string>) => void;
}
