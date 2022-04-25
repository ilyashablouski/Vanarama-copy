import { IList } from 'core/organisms/structured-list/interfaces';
import { formatAddress } from 'core/molecules/address-finder/AddressFinder';
import { TAddressEntry } from '../AddressForm/interfaces';
import { addressToDisplay } from '../../utils/address';
import { CompanyAssociate_addresses as Address } from '../../../generated/CompanyAssociate';
import { fullMonthFormatDate, getMonthName } from '../../utils/dates';

export const formatPreviousDirectorAddresses = (
  addresses?: TAddressEntry[],
  testId?: number,
) =>
  addresses?.slice(1).reduce<IList[]>(
    (acc, address, index) => [
      ...acc,
      {
        label: 'Past Address',
        value: address.address?.label || formatAddress(address?.address) || '',
        dataTestId: `summary-director-past-address[${testId || index}]`,
      },
      {
        label: 'Date Moved In',
        value:
          (address &&
            `${getMonthName(Number(address.month))} ${address.year}`) ||
          '',
        dataTestId: `summary-director-past-moved-in[${testId || index}]`,
      },
      {
        label: 'Property Status',
        value: address?.status || '',
        dataTestId: `summary-director-past-prop-status[${testId || index}]`,
      },
    ],
    [],
  );

export const formatPreviousSoletrederAddresses = (
  addresses?: Address[],
  testId?: number,
) =>
  addresses?.slice(1).reduce<IList[]>(
    (acc, address, index) => [
      ...acc,
      {
        label: 'Past Address',
        value: (address && addressToDisplay(address)) || '',
        dataTestId: `summary-director-past-address[${testId || index}]`,
      },
      {
        label: 'Date Moved In',
        value:
          (address && fullMonthFormatDate(new Date(address.startedOn ?? ''))) ||
          '',
        dataTestId: `summary-director-past-moved-in[${testId || index}]`,
      },
      {
        label: 'Property Status',
        value: address?.propertyStatus || '',
        dataTestId: `summary-director-past-prop-status[${testId || index}]`,
      },
    ],
    [],
  );

export const sortDirectorAddresses = (
  addresses: TAddressEntry[] | null | undefined,
  orderBySharehold?: number,
) => {
  const sorted = addresses
    ?.slice()
    .sort(
      (firstAddress, secondAddress) =>
        new Date(secondAddress.year).getTime() -
        new Date(firstAddress.year).getTime(),
    );

  const currentAddress = sorted?.[0] || null;
  const previousAddress = formatPreviousDirectorAddresses(
    sorted,
    orderBySharehold,
  );
  return {
    currentAddress,
    previousAddress,
  };
};

export const sortSoleTraderAddresses = (
  addresses: Address[] | null | undefined,
  orderBySharehold?: number,
) => {
  const sorted = addresses
    ?.slice()
    .sort(
      (firstAddress, secondAddress) =>
        new Date(secondAddress.startedOn ?? '').getTime() -
        new Date(firstAddress.startedOn ?? '').getTime(),
    );

  const currentAddress = sorted?.[0] || null;
  const previousAddress = formatPreviousSoletrederAddresses(
    sorted,
    orderBySharehold,
  );
  return {
    currentAddress,
    previousAddress,
  };
};
