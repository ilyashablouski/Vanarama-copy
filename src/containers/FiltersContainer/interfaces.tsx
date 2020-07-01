import { RateInputObject } from '../../../generated/globalTypes';

export interface IFilterContainerProps {
  isPersonal: boolean;
  setType: (value: boolean) => void;
  isCarSearch: boolean;
  onSearch: (filters: IFilters) => void;
  preSearchVehicleCount: number;
  isSpecialOffers: boolean;
}

export interface IFilters {
  manufacturerName: string;
  range: string;
  rate: RateInputObject;
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
}
