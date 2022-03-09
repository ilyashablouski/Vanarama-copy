import { AddressFormAddresses } from '../../../generated/AddressFormAddresses';
import { EMPTY_ADDRESS_ENTRY, IAddressFormValues } from './interfaces';
import { mapAddress } from '../../containers/CompanyDetailsFormContainer/mappers';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  addresses: AddressFormAddresses[],
): IAddressFormValues => {
  if (!addresses.length) {
    return { history: [EMPTY_ADDRESS_ENTRY] };
  }

  return {
    /**
     * NOTE: We must sort the dates to stop a bug whereby valid entries
     * are being auto-removed due to having more than 3 years history
     * because the server returns them in the incorrect order.
     */
    history: [...addresses]
      .sort(
        (firstAddress, secondAddress) =>
          new Date(secondAddress.startedOn ?? '').getTime() -
          new Date(firstAddress.startedOn ?? '').getTime(),
      )
      .map(address => {
        const movedIn = address.startedOn ? new Date(address.startedOn) : '';
        const mappedAddress = mapAddress(address);

        return {
          status: address.propertyStatus || '',
          month: movedIn && String(movedIn.getMonth() + 1),
          year: movedIn && String(movedIn.getFullYear()),
          address: mappedAddress?.label ? mappedAddress : undefined,
        };
      }),
  };
};
