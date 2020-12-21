import { IBaseProps } from '../../interfaces/base';
import { IDropdown } from '../../interfaces/dropdown';
import { IAddress } from '../../interfaces/address';

interface IEmploymentStatuses extends IDropdown {}

export interface IEmploymentHistoryObjectSlim {
  employmentStatus: string;
  month: number | null;
  year: number | null;
}

export interface IEmploymentHistoryObjectFull
  extends IEmploymentHistoryObjectSlim {
  contractType: string;
  jobTitle: string;
  companyName: string;
  phoneNumber: string;
  address: IAddress | null;
  income: string;
}

export type TEmploymentHistory =
  | IEmploymentHistoryObjectSlim
  | IEmploymentHistoryObjectFull;

export interface IEmploymentHistoryProps extends IBaseProps {
  minYearsOfHistory: number;
  lookBackYears: number;
  employmentStatuses: IEmploymentStatuses;
  employmentHistory?: TEmploymentHistory[];
  setValue?: Function; // Callback.
}

export interface IEmploymentHistoryState {
  employmentHistory: TEmploymentHistory[];
  completed: boolean;
  allValid: boolean;
}
