import { LoginUserMutation } from '../../../generated/LoginUserMutation';

export interface ILogInFormContainerProps {
  onCompleted?: (data: LoginUserMutation) => void;
}
