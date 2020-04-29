import { AddressHistoryInputObject } from '../../../generated/globalTypes';
import { IAddressFormValues } from '../../components/AddressForm/interfaces';
import { historyToMoment } from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
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
