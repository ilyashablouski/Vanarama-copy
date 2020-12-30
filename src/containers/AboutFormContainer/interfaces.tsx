import { CreateUpdatePersonMutation as Mutation } from '../../../generated/CreateUpdatePersonMutation';

export interface IProps {
  onCompleted: (data: Mutation) => void;
  onLogInClick?: () => void;
  onRegistrationClick?: () => void;
  personUuid?: string;
  personLoggedIn?: boolean;
}
