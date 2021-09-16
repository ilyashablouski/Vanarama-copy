import { GetImacaAssets_getImacaAssets as IImacaAssets } from '../../../../generated/GetImacaAssets';
import { Nullish } from '../../../types/common';

export interface IImacaConfigurator {
  id: string;
  className?: string;
  width: number;
  height: number;
  assets: IImacaAssets;
  selectedColour: Nullish<string>;
  onClick?: () => void;
  onMouseDown?: () => void;
}
