import { SaveEmploymentHistoryMutation as Mutation } from '../../../generated/SaveEmploymentHistoryMutation';

export interface IEmploymentFormContainerProps {
  isEdit?: boolean;
  onCompleted: (data: Mutation) => void;
  personUuid: string;
}
