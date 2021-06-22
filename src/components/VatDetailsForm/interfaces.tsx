type Market = {
  country: string;
  percentage: string;
};

export type VatDetailsFormValues = {
  /**
   * This is a "virtual" field, only used for complex validation outside the standard supported.
   */
  markets: Market[];
  outsideUK: boolean;
  vatNumber?: string;
  vatRegistered: boolean;
};
