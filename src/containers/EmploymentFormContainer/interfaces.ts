import { SaveEmploymentHistoryMutation as Mutation } from '../../../generated/SaveEmploymentHistoryMutation';

export interface IEmploymentFormContainerProps {
  onCompleted: (data: Mutation) => void;
  personUuid: string;
}
