import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

export const mapCreditApplicationToCreditChecker = (
  data?: CreditApplication | null,
  partyId?: string | null,
) => ({
  partyId: partyId || '',
  orderUuid: data?.lineItem?.order?.uuid,
  vehicleType:
    data?.lineItem?.vehicleProduct?.vehicleType || VehicleTypeEnum.CAR,
  capId: data?.lineItem?.vehicleProduct?.derivativeCapId,
  creditApplicationUuid: data?.uuid || '',
  monthlyPayment: data?.lineItem?.vehicleProduct?.monthlyPayment || 0,
  depositPayment: data?.lineItem?.vehicleProduct?.depositPayment || 0,
});

export default mapCreditApplicationToCreditChecker;
