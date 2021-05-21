export default function generateLimitedSteps() {
  return [
    {
      href: '/b2b/olaf/about',
      label: 'About You',
      dataPath: 'aboutDetails',
      step: 1,
    },
    {
      href: '/b2b/olaf/company-details',
      label: 'Company Details',
      dataPath: 'companyDetails',
      step: 2,
    },
    {
      href: '/b2b/olaf/vat-details/[companyUuid]',
      label: 'VAT Details',
      dataPath: 'vatDetails',
      step: 3,
    },
    {
      href: '/b2b/olaf/director-details/[companyUuid]',
      label: 'Director Details',
      dataPath: 'directorsDetails',
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
      label: 'Summary',
      dataPath: undefined,
      step: 6,
    },
  ];
}
