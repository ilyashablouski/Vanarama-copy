export interface IGetColourGroupList {
  leadTime: string;
  colors?: IColor[];
}

export interface IColor {
  hex?: string | null;
  label?: string | null;
  optionId?: number | null;
  hotOffer?: boolean | null;
}

export interface IOption {
  hex?: string | null;
  label?: string | null;
  optionId?: number | null;
  hotOffer?: boolean | null;
}

export interface IOptionsList {
  leadTime: string;
  options?: IOption[];
}
