export type TSimpleOption =
  | { label: string; value: string | number }
  | string
  | number;

export type TGroup = {
  label: string;
  values: TSimpleOption[];
};

export type TOption = TSimpleOption | TGroup;

export interface IDropdown {
  favourites?: TOption[];
  data?: TOption[];
}
