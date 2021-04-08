import { IBaseProps } from '../../interfaces/base';
import { IVimeoCustom } from '../../atoms/media/interface';
import { ICardHeaderProps } from '../../molecules/cards/CardHeader';

export interface IMediaGalleryProps extends IBaseProps {
  images: string[];
  presetSlide?: number;
  vimeoConfig?: IVimeoCustom;
  videoSrc?: string;
  threeSixtyVideoSrc?: string;
  flag: ICardHeaderProps;
  videoIframe?: boolean;
  onOffer?: boolean;
}

export interface IImageCarouselProps extends IBaseProps {
  images: string[];
  activeSlide: number;
  changeSlideHandler: (index: number) => void;
}
