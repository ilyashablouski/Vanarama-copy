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
  labelElementAttributes?: IElementAttributes;
  valueElementAttributes?: IElementAttributes;
}

export interface IStructuredListProps extends IBaseProps {
  itemWrap?: boolean;
  list: IListItemProps[];
  editable?: boolean;
  heading?: string;
  headingSize?: TSize;
  priceTag?: { price: number; info: string; size?: TSize; color?: TColor };
  onChange?(event: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void;
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

export interface IListItemProps extends IBaseProps {
  id?: string;
  key?: string;
  selectEdit?: boolean;
  textEdit?: boolean;
  label: string;
  value: string | (string | JSX.Element)[];
  name?: string;
  placeholder?: string;
  options?: {
    data: string[];
    favourites: string[];
  };
  isOrange?: boolean;
  wrap?: boolean;
  editing?: boolean;
  testId?: number;
  dataAbTestId?: string;
  onChange?(event: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void;
  labelElementAttributes?: IElementAttributes;
  valueElementAttributes?: IElementAttributes;
}
