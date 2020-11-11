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
  const creditAppUuid = Array.isArray(lineItem?.creditApplications)
    ? lineItem?.creditApplications?.[0].uuid
    : '';
  const vehicleType =
    lineItem?.vehicleProduct?.vehicleType || VehicleTypeEnum.CAR;
  const monthlyPayment = lineItem?.vehicleProduct?.monthlyPayment || 0;
  const depositPayment = lineItem?.vehicleProduct?.depositPayment || 0;
  return {
    creditAppUuid,
    vehicleType,
    monthlyPayment,
    depositPayment,
  };
}
