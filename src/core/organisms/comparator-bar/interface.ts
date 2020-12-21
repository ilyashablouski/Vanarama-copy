import { IBaseProps } from '../../interfaces/base';

export interface IComparatorBar extends IBaseProps {
  deleteVehicle: (vehicle: IVehicle) => void;
  compareVehicles: () => void;
  vehicles: IVehicle[];
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
