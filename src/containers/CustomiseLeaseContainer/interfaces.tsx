import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { GetVehicleDetails_derivativeInfo } from '../../../generated/GetVehicleDetails';

export interface IProps {
  capId: number;
  vehicleType: VehicleTypeEnum;
  derivativeInfo: GetVehicleDetails_derivativeInfo;
}
