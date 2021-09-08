import { IBaseProps } from 'core/interfaces/base';

export interface IFullScreenCarouselProps extends IBaseProps {
  images: Array<string>;
  imageAltText?: string;
  isOpenModal: boolean;
  setOpenModal: () => void;
}
