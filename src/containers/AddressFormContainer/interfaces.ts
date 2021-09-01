import { SaveAddressHistoryMutation as Mutation } from '../../../generated/SaveAddressHistoryMutation';

export interface IAddressFormContainerProps {
  personUuid: string;
  onCompleted: (data: Mutation) => void;
}
