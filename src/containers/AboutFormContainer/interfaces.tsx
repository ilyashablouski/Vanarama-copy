import { CreateUpdatePersonMutation as Mutation } from '../../../generated/CreateUpdatePersonMutation';

export interface IProps {
  onCompleted?: (data?: Mutation | null) => void;
  onLogInClick?: () => void;
  onRegistrationClick?: () => void;
  personUuid?: string;
  orderId: string;
  isEdit?: boolean;
}
