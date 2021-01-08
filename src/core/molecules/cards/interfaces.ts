import { CSSProperties } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { ICardHeaderProps } from './CardHeader';
import { ICardTitleProps } from './CardTitle';

import { ICloudflareOptimisation } from '../../../helpers/imageOptimiseUtils/interfaces';

export interface ICardProps extends IBaseProps {
  /**
   * Add "-inline" className
   */
  inline?: boolean;
  /**
   * Add "-overflow" className
   */
  overflow?: boolean;
  /**
   * Card header
   */
  header?: ICardHeaderProps;
  /**
   * Card image
   */
  imageSrc?: string;
  /**
   * Card title
   */
  title?: ICardTitleProps;
  /**
   * Card description
   */
  description?: string;
  /**
   * Image alt
   */
  alt?: string;
  /**
   * Inline style
   */
  style?: CSSProperties;
  /**
   * Image Placeholder
   */
  placeholderImage?: string;

  initialRentalDataTestId?: string;

  controlLengthDataTestId?: string;

  annualMileageDataTestId?: string;

  annualMileageBoosterDataTestId?: string;

  damageCoverDataTestId?: string;

  maintenanceDataTestId?: string;

  fuelDataTestId?: string;

  transmissionDataTestId?: string;

  colorDataTestId?: string;

  trimDataTestId?: string;

  descriptionDataTestId?: string;

  optimisedHost?: string;

  optimisationOptions?: ICloudflareOptimisation;

  loadImage?: boolean;

  loadImageData?: (options?: any) => void;
}
