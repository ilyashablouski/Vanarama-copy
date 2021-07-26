import React from 'react';
import { IBaseProps } from '../../interfaces/base';
import { IVimeoCustom } from '../../atoms/media/interface';
import { ICardHeaderProps } from '../../molecules/cards/CardHeader';

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
}

export interface IImageCarouselProps extends IBaseProps {
  images: Array<string>;
  activeSlide: number;
  changeSlideHandler: (index: number) => void;
  imageAltText?: string;
  renderImageDecoration?: (value: string, index: number) => React.ReactNode;
}
