import { AddressFormAddresses } from '../../../generated/AddressFormAddresses';
import { addressToDisplay } from '../../utils/address';
import { EMPTY_ADDRESS_ENTRY, IAddressFormValues } from './interfaces';

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
        (a, b) =>
          new Date(b.startedOn).getTime() - new Date(a.startedOn).getTime(),
      )
      .map(address => {
        const movedIn = address.startedOn ? new Date(address.startedOn) : '';

        return {
          status: address.propertyStatus || '',
          month: movedIn && String(movedIn.getMonth() + 1),
          year: movedIn && String(movedIn.getFullYear()),
          address: address.serviceId
            ? {
                id: address.serviceId,
                label: addressToDisplay(address),
              }
            : undefined,
        };
      }),
  };
};
