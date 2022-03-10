export default function generateConsumerSteps() {
  return [
    {
      href: '/olaf/about',
      label: 'About You',
      dataPath: 'aboutDetailsV2',
      step: 1,
    },
    {
      href: '/olaf/address-history',
      label: 'Address History',
      dataPath: 'addressesV2',
      step: 2,
    },
    {
      href: '/olaf/employment-history',
      label: 'Employment History',
      dataPath: 'employmentHistoriesV2',
      step: 3,
    },
    {
      href: '/olaf/expenses',
      label: 'Expenses',
      dataPath: 'incomeAndExpensesV2',
      step: 4,
    },
    {
      href: '/olaf/bank-details',
      label: 'Bank Details',
      dataPath: 'bankAccountsV2',
      step: 5,
    },
    {
      href: '/olaf/summary',
      label: 'Review your order',
      dataPath: undefined,
      step: 6,
    },
    {
      href: '/olaf/thank-you',
      label: 'Order Summary',
      dataPath: undefined,
      step: 7,
    },
  ];
}
