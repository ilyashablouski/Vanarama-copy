export default function generateSoleTraderSteps() {
  return [
    {
      href: '/b2b/olaf/about',
      label: 'About You',
      dataPath: 'aboutDetailsV2',
      step: 1,
    },
    {
      href: '/b2b/olaf/sole-trader/company-details',
      label: 'Company Details',
      dataPath: 'companyDetailsV2',
      step: 2,
    },
    {
      href: '/b2b/olaf/sole-trader/vat-details/[companyUuid]',
      label: 'VAT Details',
      dataPath: 'vatDetailsV2',
      step: 3,
    },
    {
      href: '/b2b/olaf/sole-trader/sole-trader-details/[companyUuid]',
      label: 'Sole Trader Details',
      dataPath: 'soleTraderDetailsV2',
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
      label: 'Review Your Order',
      dataPath: undefined,
      step: 6,
    },
    {
      href: '/olaf/thank-you?isB2b=1',
      label: 'Order Summary',
      dataPath: undefined,
      step: 7,
    },
  ];
}
