import { IBaseProps } from '../../interfaces/base';
import { ILink } from '../../interfaces/link';

export interface IHeaderProps extends IBaseProps {
  topBarLinks?: ILink[];
  loginLink?: ILink;
  phoneNumber?: string;
  showIvan?: boolean;
  message?: string;
}
