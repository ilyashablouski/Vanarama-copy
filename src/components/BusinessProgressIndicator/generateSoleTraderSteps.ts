export default function generateSoleTraderSteps() {
  return [
    {
      href: '/b2b/olaf/about',
      label: 'About You',
      dataPath: 'aboutDetails',
      step: 1,
    },
    {
      href: '/b2b/olaf/sole-trader/company-details',
      label: 'Company Details',
      dataPath: 'companyDetails',
      step: 2,
    },
    {
      href: '/b2b/olaf/sole-trader/vat-details/[companyUuid]',
      label: 'VAT Details',
      dataPath: 'vatDetails',
      step: 3,
    },
    {
      href: '/b2b/olaf/sole-trader/sole-trader-details/[companyUuid]',
      label: 'Sole Trader Details',
      dataPath: 'soleTraderDetails',
      step: 4,
    },
    {
      href: '/b2b/olaf/sole-trader/bank-details/[companyUuid]',
      label: 'Company Bank Details',
      dataPath: 'bankAccountsV2',
      step: 5,
    },
    {
      href: '/b2b/olaf/sole-trader/summary/[companyUuid]',
      label: 'Summary',
      dataPath: undefined,
      step: 6,
    },
  ];
}
