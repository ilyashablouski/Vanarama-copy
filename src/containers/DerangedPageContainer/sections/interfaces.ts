import { Nullable } from '../../../types/common';

export interface ISelectedVehicle {
  title: string;
  description: string;
  imageSrc: string;
  conversionId: Nullable<number>;
  capId: Nullable<number>;
}
