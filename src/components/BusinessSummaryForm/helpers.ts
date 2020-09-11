import moment from 'moment';
import { IList } from '@vanarama/uibook/lib/components/organisms/structured-list/interfaces';
import { addressToDisplay } from '../../utils/address';
import { CompanyAssociate_addresses as Address } from '../../../generated/CompanyAssociate';

export const formatPreviousAddressesArray = (
  addresses: Address[],
  testId: number,
) =>
  addresses.slice(1).reduce<IList[]>(
    (acc, address) => [
      ...acc,
      {
        label: 'Past Address',
        value: (address && addressToDisplay(address)) || '',
        dataTestId: `summary-director-past-address[${testId}]`,
      },
      {
        label: 'Date Moved In',
        value: (address && moment(address.startedOn).format('MMMM YYYY')) || '',
        dataTestId: `summary-director-past-moved-in[${testId}]`,
      },
      {
        label: 'Property Status',
        value: (address && address.propertyStatus) || '',
        dataTestId: `summary-director-past-prop-status[${testId}]`,
      },
    ],
    [],
  );

export default formatPreviousAddressesArray;
