import { IBaseProps } from '../../interfaces/base';

export interface IStepProps extends IBaseProps {
  step: number;
  heading: string;
  text: string;
}
