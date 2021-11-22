export interface IOption {
  hex?: Nullable<string>;
  label?: Nullable<string>;
  optionId?: Nullable<number>;
  hotOffer?: Nullable<boolean>;
}

export interface IOptionsList {
  leadTime: string;
  hotOffer?: Nullable<boolean>;
  options?: IOption[];
}
