import { CreateUpdatePersonMutation as Mutation } from '../../../generated/CreateUpdatePersonMutation';

export interface IProps {
  onCompleted?: (data: Mutation) => void;
  personUuid?: string;
}

export interface IAddressPerson {
  label: string;
  id: string;
}
