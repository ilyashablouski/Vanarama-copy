import { IBaseProps } from '../../interfaces/base';
import { TSize } from '../../../types/size';

export interface IScoreProps extends IBaseProps {
  score: number;
  textSize?: TSize;
}
