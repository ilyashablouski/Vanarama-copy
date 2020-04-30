import { IAddressSuggestion } from '@vanarama/uibook/lib/components/molecules/address-finder/interfaces';
import { EmploymentFormDropDownData } from '../../../generated/EmploymentFormDropDownData';
import { EmploymentFormEmployment } from '../../../generated/EmploymentFormEmployment';

export type TEmploymentEntry = {
  address?: IAddressSuggestion;
  company: string;
  contract: string;
  income: string;
  month: string;
  phoneNumber: string;
  status: string;
  title: string;
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
