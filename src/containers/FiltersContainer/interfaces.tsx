import { RateInputObject } from '../../../generated/globalTypes';

export interface IFilterContainerProps {
  isPersonal: boolean;
  setType: (value: boolean) => void;
  isCarSearch: boolean;
  onSearch: (filters: IFilters) => void;
  preSearchVehicleCount: number;
  isSpecialOffers: boolean;
  isMakePage?: boolean;
  isPickups?: boolean;
  isRangePage?: boolean;
  isModelPage?: boolean;
  isAllMakesPage?: boolean;
  isBodyPage?: boolean;
}

export interface IFilters {
  manufacturerName: string;
  rangeName: string;
  rate: RateInputObject;
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
}
