import { OnSubmit } from 'react-hook-form';
import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import { BusinessAboutFormDropDownData } from '../../../generated/BusinessAboutFormDropDownData';

export interface IBusinessAboutFormValues {
  title: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  companyType: string;
  consent: boolean;
  marketing: boolean;
  termsAndConditions: boolean;
}

export interface IProps {
  isEdited: boolean;
  dropDownData: BusinessAboutFormDropDownData;
  onSubmit: OnSubmit<IBusinessAboutFormValues>;
  person?: AboutFormPerson | null;
  onLogInCLick?: () => void;
  onEmailExistenceCheck?: (email: string) => Promise<boolean>;
}
