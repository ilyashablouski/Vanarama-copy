
import { AuthState } from '../redux/account/types';
import { RegisterState } from '../redux/account/types';

export interface RootState {
  auth: AuthState;
  register: RegisterState,
}
  