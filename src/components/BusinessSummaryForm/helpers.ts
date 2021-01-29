import { IList } from 'core/organisms/structured-list/interfaces';
import { TAddressEntry } from '../AddressForm/interfaces';

export const formatPreviousAddressesArray = (
  addresses?: TAddressEntry[],
  testId?: number,
) =>
  addresses?.slice(1).reduce<IList[]>(
    (acc, address, indx) => [
      ...acc,
      {
        label: 'Past Address',
        value: address.address?.label || '',
        dataTestId: `summary-director-past-address[${testId || indx}]`,
      },
      {
        label: 'Date Moved In',
        value: (address && `${address.month} ${address.year}`) || '',
        dataTestId: `summary-director-past-moved-in[${testId || indx}]`,
      },
      {
        label: 'Property Status',
        value: address?.status || '',
        dataTestId: `summary-director-past-prop-status[${testId || indx}]`,
      },
    ],
    [],
  );

export const sortAddresses = (
  addresses: TAddressEntry[] | null | undefined,
  orderBySharehold?: number,
) => {
  const sorted = addresses
    ?.slice()
    .sort((a, b) => new Date(a.year).getTime() - new Date(b.year).getTime())
    .reverse();
  const currentAddress = sorted?.[0] || null;
  const previousAddress = formatPreviousAddressesArray(
    sorted,
    orderBySharehold,
  );
  return {
    currentAddress,
    previousAddress,
  };
};
