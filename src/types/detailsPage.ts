export interface IGetColourGroupList {
  leadTime: string;
  colors: IColor[] | undefined;
}

export interface IColor {
  hex: string | null;
  label?: string | null | undefined;
  optionId?: number | null | undefined;
  hotOffer?: boolean | null | undefined;
}
