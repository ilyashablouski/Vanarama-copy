import { IBaseProps } from '../../interfaces/base';

export interface ISlidingInputProps extends IBaseProps {
  steps: (number | ISlidingObject)[];
  defaultValue?: number;
  disabled?: boolean | undefined;
  onChange: (value: number) => void;
}

export interface ISlidingObject {
  value: number;
  label: string;
}
