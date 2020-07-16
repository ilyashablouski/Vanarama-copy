export enum CompanyTypes {
  limited = 'Limited',
  soleTrader = 'Sole trader',
}

export const companyTypesList = [
  {
    label: 'Sole trader',
    value: CompanyTypes.soleTrader,
  },
  {
    label: 'Limited liability partnership',
    value: CompanyTypes.limited,
  },
  {
    label: 'Limited company',
    value: CompanyTypes.limited,
  },
];
