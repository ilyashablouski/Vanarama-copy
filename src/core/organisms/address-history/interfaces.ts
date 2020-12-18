import { IBaseProps } from '../../interfaces/base';
import { IDropdown } from '../../interfaces/dropdown';
import { IAddress } from '../../interfaces/address';

interface IPropertyStatuses extends IDropdown {}

export interface IAddressHistoryObject {
  address: IAddress;
  propertyStatus: string;
  month: number;
  year: number;
}

export interface IAddressHistoryProps extends IBaseProps {
  name: string;
  minYearsOfHistory: number;
  lookBackYears: number;
  propertyStatuses: IPropertyStatuses;
  addressHistory?: IAddressHistoryObject[];
  setValue?: Function; // Callback.
}

export interface IAddressHistoryState {
  addressHistory?: IAddressHistoryObject[];
  completed: boolean;
  allValid: boolean;
}
