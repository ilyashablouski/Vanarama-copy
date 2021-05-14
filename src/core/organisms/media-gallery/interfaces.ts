import { IBaseProps } from '../../interfaces/base';
import { IVimeoCustom } from '../../atoms/media/interface';
import { ICardHeaderProps } from '../../molecules/cards/CardHeader';

export interface IMediaGalleryProps extends IBaseProps {
  images: Array<string | string[]>;
  presetSlide?: number;
  vimeoConfig?: IVimeoCustom;
  videoSrc?: string;
  threeSixtyVideoSrc?: string;
  flag: ICardHeaderProps;
  videoIframe?: boolean;
  activeTabIndex?: number;
  imageAltText?: string;
}

export interface IImageCarouselProps extends IBaseProps {
  images: Array<string | string[]>;
  activeSlide: number;
  changeSlideHandler: (index: number) => void;
  imageAltText?: string;
}
