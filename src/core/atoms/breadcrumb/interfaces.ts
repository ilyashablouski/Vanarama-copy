import { IBaseProps } from '../../interfaces/base';
import { ILink } from '../../interfaces/link';

export interface IBreadcrumbProps extends IBaseProps {
  items?: ILink[];
}
