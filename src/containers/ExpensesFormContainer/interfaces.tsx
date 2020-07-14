import { CreateExpenseMutation as Mutation } from '../../../generated/CreateExpenseMutation';

export interface IProps {
  personUuid: string;
  onCompleted: (data: Mutation) => void;
}
