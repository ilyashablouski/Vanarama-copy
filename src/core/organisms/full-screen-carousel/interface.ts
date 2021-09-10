import { IBaseProps } from 'core/interfaces/base';

export interface IFullScreenCarouselProps extends IBaseProps {
  images: Array<string>;
  activeSlideIndex?: number;
  imageAltText?: string;
  isOpenModal: boolean;
  setOpenModal: () => void;
}
