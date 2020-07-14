import { CreateUpdateBankAccountMutation as Mutation } from '../../../generated/CreateUpdateBankAccountMutation';

export interface IProps {
  personUuid: string;
  onCompleted: (data: Mutation) => void;
}
