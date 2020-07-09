import { TAddressEntry } from '../AddressForm/interfaces';

export type DirectorDetailsFormValues = {
  directors: DirectorFormValues[];
  totalPercentage: number;
};

export type DirectorFormValues = {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  shareOfBusiness: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  numberOfDependants: string;
  history: TAddressEntry[];
};
