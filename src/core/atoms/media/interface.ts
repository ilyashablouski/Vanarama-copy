import { IBaseProps } from '../../interfaces/base';

export interface IVimeoCustom {
  autopause?: boolean;
  color?: string;
  playsinline?: boolean;
  title?: boolean;
  portrait?: boolean;
}

export interface IMediaProps extends IBaseProps {
  src: string;
  noLazy?: boolean;
  player?: boolean;
  playing?: boolean;
  width?: string;
  height?: string;
  loop?: boolean;
  controls?: boolean;
  preload?: boolean;
  vimeoConfig?: IVimeoCustom;
  responsive?: boolean;

  /** true to show just the video thumbnail, which loads the full player on click.
   *  also you can pass an image URL to set your own thumbnail
   */
  light?: boolean | string;

  /** Set the volume of the player, between 0 and 1 */
  volume?: number;

  /** Mutes the player ◦  Only works if volume is set */
  muted?: false;
}
