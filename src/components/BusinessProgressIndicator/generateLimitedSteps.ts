export default function generateLimitedSteps() {
  return [
    {
      href: '/b2b/olaf/about',
      label: 'About You',
      dataPath: 'aboutDetailsV2',
      step: 1,
    },
    {
      href: '/b2b/olaf/company-details',
      label: 'Company Details',
      dataPath: 'companyDetailsV2',
      step: 2,
    },
    {
      href: '/b2b/olaf/vat-details/[companyUuid]',
      label: 'VAT Details',
      dataPath: 'vatDetailsV2',
      step: 3,
    },
    {
      href: '/b2b/olaf/director-details/[companyUuid]',
      label: 'Director Details',
      dataPath: 'directorsDetailsV2',
      step: 4,
    },
    {
      href: '/b2b/olaf/company-bank-details/[companyUuid]',
      label: 'Company Bank Details',
      dataPath: 'bankAccountsV2',
      step: 5,
    },
    {
      href: '/b2b/olaf/summary/[companyUuid]',
      label: 'Review your order',
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
