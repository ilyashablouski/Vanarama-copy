export interface IGetColourGroupList {
  leadTime: string;
  colors?: IColor[];
}

export interface IColor {
  hex?: Nullable<string>;
  label?: Nullable<string>;
  optionId?: Nullable<number>;
  hotOffer?: Nullable<boolean>;
}

export interface IOption {
  hex?: Nullable<string>;
  label?: Nullable<string>;
  optionId?: Nullable<number>;
  hotOffer?: Nullable<boolean>;
}

export interface IOptionsList {
  leadTime: string;
  options?: IOption[];
}
