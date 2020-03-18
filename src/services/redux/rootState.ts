import { AuthState, RegisterState } from './account/types';

export interface RootState {
  auth: AuthState;
  register: RegisterState;
}
