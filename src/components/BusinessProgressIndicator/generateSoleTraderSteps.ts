export default function generateSoleTraderSteps() {
  return [
    {
      href: '/b2b/olaf/about',
      label: 'About You',
      step: 1,
    },
    {
      href: '/b2b/olaf/sole-trader/company-details',
      label: 'Company Details',
      step: 2,
    },
    {
      href: '/b2b/olaf/sole-trader/vat-details/[companyUuid]',
      label: 'VAT Details',
      step: 3,
    },
    {
      href: '/b2b/olaf/sole-trader/sole-trader-details/[companyUuid]',
      label: 'Sole Trader Details',
      step: 4,
    },
    {
      href: '/b2b/olaf/sole-trader/bank-details/[companyUuid]',
      label: 'Company Bank Details',
      step: 5,
    },
    {
      href: '/b2b/olaf/sole-trader/summary/[companyUuid]',
      label: 'Summary',
      step: 6,
    },
  ];
}
