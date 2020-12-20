import { IBaseProps } from '../../interfaces/base';

export interface ILeaseScannerProps extends IBaseProps {
  price: number;
  headingText: string;
  withCheckBox?: boolean;
  leasingProviders: string[];
  /**
   * Update price request status
   */
  startLoading: boolean;
  orderNowClick: () => void;
  nextBestPrice?: string;
  classNameHeading?: string;
  priceLabel?: string;
  endAnimation: () => void;
  requestCallBack?: () => void;
}
