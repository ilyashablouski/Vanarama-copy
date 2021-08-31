import { SaveAddressHistoryMutation as Mutation } from '../../../generated/SaveAddressHistoryMutation';

export interface IAddressFormContainerProps {
  orderId: string;
  personUuid: string;
  onCompleted: (data: Mutation) => void;
}
