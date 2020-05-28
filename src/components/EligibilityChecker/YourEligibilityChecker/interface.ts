export interface IYourEligiblityCheckerValues {
  firstName: string;
  lastName: string;
  email: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  promotions?: boolean;
  addressFinder?: {
    id?: string;
    label?: string;
  };
}

export interface IProps {
  submit: (values: IYourEligiblityCheckerValues) => void;
}
