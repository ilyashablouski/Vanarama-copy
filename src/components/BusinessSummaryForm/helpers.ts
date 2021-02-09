import { IList } from 'core/organisms/structured-list/interfaces';
import { TAddressEntry } from '../AddressForm/interfaces';
import { addressToDisplay } from '../../utils/address';
import { CompanyAssociate_addresses as Address } from '../../../generated/CompanyAssociate';
import { fullMonthFormatDate, getMonthName } from '../../utils/dates';

export const formatPreviousDirectorAddresses = (
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
        value:
          (address &&
            `${getMonthName(Number(address.month))} ${address.year}`) ||
          '',
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

export const formatPreviousSoletrederAddresses = (
  addresses?: Address[],
  testId?: number,
) =>
  addresses?.slice(1).reduce<IList[]>(
    (acc, address, indx) => [
      ...acc,
      {
        label: 'Past Address',
        value: (address && addressToDisplay(address)) || '',
        dataTestId: `summary-director-past-address[${testId || indx}]`,
      },
      {
        label: 'Date Moved In',
        value:
          (address && fullMonthFormatDate(new Date(address.startedOn))) || '',
        dataTestId: `summary-director-past-moved-in[${testId || indx}]`,
      },
      {
        label: 'Property Status',
        value: address?.propertyStatus || '',
        dataTestId: `summary-director-past-prop-status[${testId || indx}]`,
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
    .sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime());

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
      (a, b) =>
        new Date(b.startedOn).getTime() - new Date(a.startedOn).getTime(),
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
