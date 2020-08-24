export enum CompanyTypes {
  limited = 'Limited',
  soleTrader = 'Sole trader',
  partnership = 'Limited liability partnership',
}

export const companyTypesList = [
  {
    label: 'Sole trader',
    value: CompanyTypes.soleTrader,
  },
  {
    label: 'Limited liability partnership',
    value: CompanyTypes.partnership,
  },
  {
    label: 'Limited company',
    value: CompanyTypes.limited,
  },
];
