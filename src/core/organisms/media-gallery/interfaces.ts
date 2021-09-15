import { ReactNode } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { IVimeoCustom } from '../../atoms/media/interface';
import { ICardHeaderProps } from '../../molecules/cards/CardHeader';
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
  showElectricBanner?: boolean | null;
  showInsuranceBanner?: boolean | null;
  colour: Nullable<number>;
  setColour: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface IImageCarouselProps extends IBaseProps {
  images: Array<string>;
  imageAltText?: string;
  renderImageDecoration?: (value: string, index: number) => ReactNode;
}

export interface IImacaViewer extends IBaseProps {
  colour: Nullable<number>;
  setColour: React.Dispatch<React.SetStateAction<number | null>>;
}
