import { RateInputObject } from '../../../generated/globalTypes';

export interface IFilterContainerProps {
  isPersonal: boolean;
  setType: (value: boolean) => void;
  isCarSearch: boolean;
  onSearch: (filters: IFilters) => void;
  updateCount: (filters: IFilters) => void;
  preSearchVehicleCount: number;
}

export interface IFilters {
  manufacturerName: string;
  range: string;
  rate: RateInputObject;
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
}
