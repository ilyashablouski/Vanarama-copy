import { IBaseProps } from '../../interfaces/base';
import { TAsset } from './types';

export interface ILogoProps extends IBaseProps {
  assetName: TAsset;
  dataUiTestId?: string;
}
