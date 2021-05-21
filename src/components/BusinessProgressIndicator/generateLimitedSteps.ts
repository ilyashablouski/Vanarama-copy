export default function generateLimitedSteps() {
  return [
    {
      href: '/b2b/olaf/about',
      label: 'About You',
      step: 1,
    },
    {
      href: '/b2b/olaf/company-details',
      label: 'Company Details',
      step: 2,
    },
    {
      href: '/b2b/olaf/vat-details/[companyUuid]',
      label: 'VAT Details',
      step: 3,
    },
    {
      href: '/b2b/olaf/director-details/[companyUuid]',
      label: 'Director Details',
      step: 4,
    },
    {
      href: '/b2b/olaf/company-bank-details/[companyUuid]',
      label: 'Company Bank Details',
      step: 5,
    },
    {
      href: '/b2b/olaf/summary/[companyUuid]',
      label: 'Summary',
      step: 6,
    },
  ];
}
