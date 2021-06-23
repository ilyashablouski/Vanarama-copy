import { GetPerson_getPerson as Person } from '../../generated/GetPerson';
import { Nullable } from './common';

export interface IPersonState {
  personLoggedIn: boolean;
  person: Nullable<Person>;
}
