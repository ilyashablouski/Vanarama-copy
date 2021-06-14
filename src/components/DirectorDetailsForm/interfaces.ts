import { TAddressEntry } from '../AddressForm/interfaces';
import { CompanyAssociate_addresses as Address } from '../../../generated/CompanyAssociate';

export type DirectorDetailsFormValues = {
  directors: DirectorFormValues[];
  totalPercentage: number | null;
};

export type DirectorFormValues = {
  uuid?: string;
  title: string;
  firstName: string;
  originalFirstName: string;
  lastName: string;
  originalLastName: string;
  gender: string;
  shareOfBusiness: number | null;
  nationality: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  numberOfDependants: string;
  history: TAddressEntry[];
  email?: string;
};

export type DirectorDetails = DirectorFormValues & { addresses?: Address[] };
