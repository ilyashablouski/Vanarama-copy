import { EmploymentFormDropDownData } from '../../../generated/EmploymentFormDropDownData';

export type TEmploymentEntry = {
  status: string;
  month: string;
  year: string;
  contract?: string;
  title?: string;
  company?: string;
  phoneNumber?: string;
  address?: { id: string };
  income?: string;
};

export interface IEmploymentFormValues {
  history: TEmploymentEntry[];
}

export interface IEmploymentFormProps {
  dropDownData: EmploymentFormDropDownData;
  onSubmit: (values: IEmploymentFormValues) => Promise<void>;
}
