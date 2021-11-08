import { CreateUpdatePersonMutation as Mutation } from '../../../generated/CreateUpdatePersonMutation';

export interface IProps {
  onCompleted: (data: Mutation) => void;
  onLogInClick?: () => void;
  onRegistrationClick?: () => void;
  personUuid?: string;
  orderId: string;
  isEdit?: boolean;
}
