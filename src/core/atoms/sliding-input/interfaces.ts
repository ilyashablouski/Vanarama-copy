import { Dispatch, SetStateAction } from 'react';
import { IBaseProps } from '../../interfaces/base';

export interface ISlidingInputProps extends IBaseProps {
  steps: (number | ISlidingObject)[];
  defaultValue?: number;
  setDefaultMileageIndex?: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
  onChange: (value: number) => void;
  disabledFirstStep?: boolean;
  disabledLastStep?: boolean;
}

export interface ISlidingObject {
  value: number;
  label: string;
}
