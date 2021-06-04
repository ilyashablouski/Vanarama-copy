import { IBaseProps } from 'core/interfaces/base';
import { IBreadcrumbLink } from 'components/Breadcrumb/helpers';

export interface IWishlistContainer extends IBaseProps {
  pageTitle: string;
  breadcrumbsList: Array<IBreadcrumbLink>;
}

export interface IWishlistRegistration extends IBaseProps {}
