export type PercentageTrade = {
  country: string;
  percentage: string;
};

export type VatDetailsFormValues = {
  isValidTotal: boolean;
  outsideUK: boolean;
  trade: PercentageTrade[];
  vatNumber: string;
  vatRegistered: boolean;
};
