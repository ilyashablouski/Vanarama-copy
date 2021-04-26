import { CreateUpdatePersonMutation as Mutation } from '../../../generated/CreateUpdatePersonMutation';
import { GetPerson_getPerson as Person } from '../../../generated/GetPerson';

export interface IProps {
  onCompleted?: (data: Mutation) => void;
  person: Person;
}

export interface IAddressPerson {
  label: string;
  id: string;
}
