import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { GetCreditApplicationByOrderUuidDataForCreditCheck } from '../../../generated/GetCreditApplicationByOrderUuidDataForCreditCheck';

export default function parseCreditApplicationData(
  creditApplicationData:
    | GetCreditApplicationByOrderUuidDataForCreditCheck
    | undefined,
) {
  const lineItem =
    creditApplicationData?.creditApplicationByOrderUuid?.lineItem;
  // NOTE: Many are returned so just take the first one?
  const creditAppUuid = lineItem?.creditApplications?.length
    ? lineItem?.creditApplications?.[0].uuid
    : '';
  const partyUuid = lineItem?.order?.partyUuid || '';
  const vehicleType =
    lineItem?.vehicleProduct?.vehicleType || VehicleTypeEnum.CAR;
  const monthlyPayment = lineItem?.vehicleProduct?.monthlyPayment || 0;
  const depositPayment = lineItem?.vehicleProduct?.depositPayment || 0;
  return {
    partyUuid,
    creditAppUuid,
    vehicleType,
    monthlyPayment,
    depositPayment,
  };
}
