import { IBaseProps } from 'core/interfaces/base';
import {
  IVehicle as IVehicleState,
  IVehicleCarousel,
} from '../../../utils/comparatorHelpers';

export interface IComparatorBar extends IBaseProps {
  deleteVehicle: (vehicle: IVehicle) => void;
  compareVehicles: () => void;
  vehicles: IVehicleState[] | IVehicleCarousel[];
  setCompareVehicles: (vehicles: IVehicleState[] | IVehicleCarousel[]) => void;
}

export interface IVehicle {
  capId: string | null;
  derivativeName: string | null;
  manufacturerName: string | null;
  rangeName: string | null;
}

export interface IComparatorBarCard extends IBaseProps {
  deleteVehicle: () => void;
  number: number;
  vehicle: IVehicle | undefined | null;
}
