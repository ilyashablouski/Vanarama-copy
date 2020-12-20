import { IBaseProps } from '../../interfaces/base';

export interface IDetailsProps extends IBaseProps {
  summary?: string;
  content?: string;
  open?: boolean;
}
