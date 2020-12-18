import { OnSubmit } from 'react-hook-form';
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
  privacyPolicy: boolean;
}

export interface IProps {
  isEdited: boolean;
  dropDownData: BusinessAboutFormDropDownData;
  personLoggedIn?: boolean;
  onSubmit: OnSubmit<IBusinessAboutFormValues>;
  person?: IBusinessAboutFormValues | null;
  onLogInCLick?: () => void;
  onEmailExistenceCheck?: (email: string) => Promise<boolean>;
}
