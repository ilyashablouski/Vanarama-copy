import { IBaseProps } from '../../interfaces/base';

export interface IModalProps extends IBaseProps {
  title?: string;
  text?: string;
  show: boolean;
  additionalText?: string;
  onRequestClose?: () => void;
  containerClassName?: string;
}
