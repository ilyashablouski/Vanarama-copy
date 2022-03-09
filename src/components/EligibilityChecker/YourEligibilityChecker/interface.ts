import {
  Control,
  FieldError,
  FormStateProxy,
  NestDataObject,
  OnSubmit,
} from 'react-hook-form';
import { QuickCreditCheckerEligibility } from '../../../../generated/QuickCreditCheckerEligibility';

export interface IYourEligiblityCheckerValues {
  firstName: string;
  lastName: string;
  email: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  addressFinder?: {
    id?: string;
    label?: string;
  };
  termsAndCons: boolean;
  privacyPolicy: boolean;
  consent?: boolean;
}

export interface IFormProps {
  creditChecker?: QuickCreditCheckerEligibility;
  submit: (values: IYourEligiblityCheckerValues) => void;
  errors: NestDataObject<IYourEligiblityCheckerValues, FieldError>;
  handleSubmit: (
    callback: OnSubmit<IYourEligiblityCheckerValues>,
  ) => (
    event?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  register: any;
  triggerValidation: (
    payload?: string | string[] | undefined,
  ) => Promise<boolean>;
  watch: any;
  formState: FormStateProxy<IYourEligiblityCheckerValues>;
  control: Control<IYourEligiblityCheckerValues>;
}

export interface IProps {
  creditChecker?: QuickCreditCheckerEligibility;
  submit: (values: IYourEligiblityCheckerValues) => void;
}

export interface IDrivingLicence {
  address: string;
  birthData: string;
  driverNumber: string;
  expiryDate: {
    day: number;
    month: number;
    year: number;
    originalString: string;
  };
  firstName: string;
  issueDate: {
    day: number;
    month: number;
    year: number;
    originalString: string;
  };
  issuingAuthority: string;
  lastName: string;
  personalNumber: string;
  type: string;
}
