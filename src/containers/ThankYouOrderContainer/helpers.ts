import { GetCreditApplicationByOrderUuid as Query } from '../../../generated/GetCreditApplicationByOrderUuid';
import { Nullish } from '../../types/common';

// eslint-disable-next-line import/prefer-default-export
export function getFunderName(data: Nullish<Query>): Nullish<string> {
  return data?.creditApplicationByOrderUuid?.lineItem?.vehicleProduct
    ?.funderData.funder_name;
}
