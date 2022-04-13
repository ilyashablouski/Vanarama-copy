import { ReactNode } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { IVimeoCustom } from '../../atoms/media/interface';
import { ICardHeaderProps } from '../../molecules/cards/CardHeader';
import { GetImacaAssets_getImacaAssets as IImacaAssets } from '../../../../generated/GetImacaAssets';
import { Nullable } from '../../../types/common';

export interface IMediaGalleryProps extends IBaseProps {
  images: Array<string>;
  presetSlide?: number;
  vimeoConfig?: IVimeoCustom;
  videoSrc?: string;
  threeSixtyVideoSrc?: string;
  flag: ICardHeaderProps;
  videoIframe?: boolean;
  activeTabIndex?: number;
  imageAltText?: string;
  showElectricBanner?: Nullable<boolean>;
  showInsuranceBanner?: Nullable<boolean>;
  colour: Nullable<number>;
  setColour: React.Dispatch<React.SetStateAction<number | null>>;
  imacaAssets: Nullable<IImacaAssets>;
  isCar: boolean;
  toggleColorAndTrimModalVisible: () => void;
  isColourAndTrimOverlay: boolean;
}

export interface IImacaViewer extends IBaseProps {
  assets: IImacaAssets;
  colour: Nullable<number>;
  setColour: React.Dispatch<React.SetStateAction<number | null>>;
  upscaleCanvas: boolean;
  isOpenColourSelect?: boolean;
}

export interface IImageCarouselProps extends IBaseProps {
  images: Array<string>;
  imageAltText?: string;
  renderImageDecoration?: (value: string, index: number) => ReactNode;
}
