import { CreateUpdateBankAccountMutation as Mutation } from '../../../generated/CreateUpdateBankAccountMutation';

export interface IProps {
  isEdit?: boolean;
  personUuid: string;
  onCompleted: (data: Mutation) => void;
}
