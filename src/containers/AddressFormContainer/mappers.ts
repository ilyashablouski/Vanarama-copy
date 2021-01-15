import { AddressHistoryInputObject } from '../../../generated/globalTypes';
import { IAddressFormValues } from '../../components/AddressForm/interfaces';
import { parseDate } from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  partyId: string,
  values: IAddressFormValues,
): AddressHistoryInputObject => ({
  partyId,
  addresses: values.history.map(item => ({
    serviceId: item.address?.id,
    propertyStatus: item.status,
    startedOn: parseDate('01', item.month, item.year),
  })),
});
