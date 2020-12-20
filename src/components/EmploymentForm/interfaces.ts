import { IAddressSuggestion } from 'core/molecules/address-finder/interfaces';
import { EmploymentFormDropDownData } from '../../../generated/EmploymentFormDropDownData';
import { EmploymentFormEmployment } from '../../../generated/EmploymentFormEmployment';

export type TEmploymentEntry = {
  address?: IAddressSuggestion;
  company: string | null;
  contract: string | null;
  income: string | null;
  month: string;
  phoneNumber: string | null;
  status: string;
  title: string | null;
  year: string;
};

export interface IEmploymentFormValues {
  history: TEmploymentEntry[];
}

export interface IEmploymentFormProps {
  dropDownData: EmploymentFormDropDownData;
  employments: EmploymentFormEmployment[];
  onSubmit: (values: IEmploymentFormValues) => Promise<any>;
}

export const EMPTY_EMPLOYMENT_ENTRY: TEmploymentEntry = {
  address: undefined,
  company: '',
  contract: '',
  income: '',
  month: '',
  phoneNumber: '',
  status: '',
  title: '',
  year: '',
};
