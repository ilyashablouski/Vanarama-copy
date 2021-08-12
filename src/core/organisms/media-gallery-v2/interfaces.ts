import { ReactNode } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { IVimeoCustom } from '../../atoms/media/interface';
import { ICardHeaderProps } from '../../molecules/cards/CardHeader';

export interface IMediaGalleryV2Props extends IBaseProps {
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
  imageAltText?: string;
  renderImageDecoration?: (value: string, index: number) => ReactNode;
}
