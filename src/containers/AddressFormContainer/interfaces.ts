import { SaveAddressHistoryMutation as Mutation } from '../../../generated/SaveAddressHistoryMutation';

export interface IAddressFormContainerProps {
  isEdit?: boolean;
  personUuid: string;
  onCompleted: (data: Mutation) => void;
}
