import { AboutFormDropdownData } from '../../../generated/AboutFormDropdownData';
import { AboutFormPerson } from '../../../generated/AboutFormPerson';

export interface IPersonalInformationValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  consent?: boolean;
}

export interface IProps {
  dropdownData: AboutFormDropdownData;
  person?: AboutFormPerson | null;
  submit: (values: IPersonalInformationValues) => Promise<any>;
}
