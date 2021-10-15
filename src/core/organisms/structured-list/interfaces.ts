import { ChangeEvent } from 'react';
import { IBaseProps } from 'core/interfaces/base';
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
  value: string | (string | JSX.Element)[];
  isOrange?: boolean;
  dataAbTestId?: string;
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

interface IElementAttributes {
  dataAbTestId: string;
}

export interface IListItemProps extends IList {
  wrap?: boolean;
  editing: boolean;
  dataTestId?: string;
  testId?: number;
  id?: string;
  onChange?(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void;
  labelElementAttributes?: IElementAttributes;
  valueElementAttributes?: IElementAttributes;
}

export interface IOrderListData {
  value: string | (string | JSX.Element)[];
  label: string;
  id?: string;
  dataTestId?: string;
  dataAbTestId?: string;
  labelElementAttributes?: IElementAttributes;
  valueElementAttributes?: IElementAttributes;
  isOrange?: boolean;
  key?: string;
}
