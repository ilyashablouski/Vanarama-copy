import { ChangeEvent } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { TSize } from '../../../types/size';
import { TColor } from '../../../types/color';

export interface IList extends IBaseProps {
  selectEdit?: boolean;
  textEdit?: boolean;
  placeholder?: string;
  dataTestId?: string;
  options?: {
    data: string[];
    favourites: string[];
  };
  name?: string;
  label: string;
  value: string | string[];
  isOrange?: boolean;
}

export interface IStructuredListProps extends IBaseProps {
  itemWrap?: boolean;
  list: IList[];
  editable?: boolean;
  heading?: string;
  headingSize?: TSize;
  priceTag?: { price: number; info: string; size?: TSize; color?: TColor };
  onChange?(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void;
  /**
   * Callback function called when the user clicks the "Edit" link
   */
  onEditClicked?: () => void;
  /**
   * A data-testid attribute to attach to the "Edit" link
   */
  editDataTestId?: string;
  priceDataTestId?: string;
  priceTagDataTestId?: string;
  headingDataTestId?: string;
}

export interface IListItemProps extends IList {
  wrap?: boolean;
  editing: boolean;
  dataTestId?: string;
  testId?: number;
  onChange?(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void;
}
