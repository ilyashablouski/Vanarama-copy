import { GetAddressContainerDataQuery } from '../../../generated/GetAddressContainerDataQuery';
import { AddressHistoryInputObject } from '../../../generated/globalTypes';
import { IAddressFormValues } from '../../components/AddressForm/interfaces';
import { addressToDisplay } from '../../utils/address';
import { historyToMoment } from '../../utils/dates';

export const responseToInitialFormValues = (
  response: GetAddressContainerDataQuery,
): IAddressFormValues | undefined => {
  if (
    !response.personByUuid?.addresses ||
    !response.personByUuid.addresses.length
  ) {
    return undefined;
  }

  return {
    /**
     * NOTE: We must sort the dates to stop a bug whereby valid entries
     * are being auto-removed due to having more than 3 years history
     * because the server returns them in the incorrect order.
     */
    history: response.personByUuid.addresses
      .sort(
        (a, b) =>
          new Date(b.startedOn).getTime() - new Date(a.startedOn).getTime(),
      )
      .map(address => {
        const movedIn = new Date(address.startedOn);
        return {
          status: address.propertyStatus || '',
          month: String(movedIn.getMonth() + 1),
          year: String(movedIn.getFullYear()),
          address: address.serviceId
            ? { id: address.serviceId, label: addressToDisplay(address) }
            : undefined,
        };
      }),
  };
};

export const formValuesToInput = (
  partyId: string,
  values: IAddressFormValues,
): AddressHistoryInputObject => ({
  partyId,
  addresses: values.history.map(item => ({
    serviceId: item.address?.id,
    propertyStatus: item.status,
    startedOn: historyToMoment(item).format('YYYY-MM-DD'),
  })),
});
