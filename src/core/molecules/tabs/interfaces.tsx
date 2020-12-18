import { IBaseProps } from '../../interfaces/base';
import { TSize } from '../../../types/size';

export type TabAlignment = 'start' | 'center' | 'expand';

export type TabColorVariant = 'normal' | 'alternative';

export interface ITabsProps extends IBaseProps {
  /**
   * The controlled active index of the tabs.
   */
  activeIndex: number;
  /**
   * The horizontal alignment of the tabs.
   */
  align?: TabAlignment;
  /**
   * Give this element an explicit ID and override the generated one.
   */
  id?: string;
  /**
   * The callback to update the active tab index.
   */
  onChange: (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  /**
   * The size of the tabs.
   */
  size?: TSize;
  /**
   * The color variant of the tabs.
   */
  variant?: TabColorVariant;
}
