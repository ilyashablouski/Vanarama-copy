import { IList } from 'core/organisms/structured-list/interfaces';
import { addressToDisplay } from '../../utils/address';
import { CompanyAssociate_addresses as Address } from '../../../generated/CompanyAssociate';
import { fullMonthFormatDate } from '../../utils/dates';

export const formatPreviousAddressesArray = (
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

export const sortAddresses = (
  addresses: Address[] | null | undefined,
  orderBySharehold?: number,
) => {
  const sorted = addresses
    ?.slice()
    .sort(
      (a, b) =>
        new Date(a.startedOn).getTime() - new Date(b.startedOn).getTime(),
    )
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
