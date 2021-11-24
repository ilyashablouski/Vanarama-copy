export interface IOption {
  hex?: Nullable<string>;
  label?: Nullable<string>;
  optionId?: Nullable<number>;
  hotOffer?: Nullable<boolean>;
}

export interface IOptionsList {
  leadTime: Nullable<string>;
  hotOffer?: Nullable<boolean>;
  options?: Nullable<Nullable<IOption>[]>;
}
